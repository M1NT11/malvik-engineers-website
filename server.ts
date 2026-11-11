import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { seedDatabaseIfEmpty } from './src/db/seed.ts';
import {
  getAllProducts,
  getProductById,
  createProductRecord,
  updateProductRecord,
  deleteProductRecord,
  createEnquiryWithAttachment,
  getAllEnquiries,
  getEnquiryByIdWithAttachment,
  updateEnquiryStatusAndNotes,
  deleteEnquiryRecord,
  getAttachmentByEnquiryId,
} from './src/db/queries.ts';
import { requireAdminAuth, AuthRequest } from './src/middleware/auth.ts';
import { createAdminSession, invalidateSession, verifyPassword, hashPassword } from './src/lib/auth-service.ts';
import { adminAuth } from './src/lib/firebase-admin.ts';
import { generateCompanyProfilePDF } from './src/utils/pdfGenerator.ts';
import { isValidBusinessEmail, generateEnquiryRef } from './src/utils/fastenerCalculations.ts';
import { COMPANY_FACTS } from './src/data/fastenerData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parsers with reasonable size limits for drawing attachments
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Seed Cloud SQL database if empty
seedDatabaseIfEmpty().catch(err => {
  console.error('Initial DB seeding check failed:', err);
});

// Configure admin credentials hash from environment
// If not configured, generate a deterministic scrypt salt/hash for initial setup
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Malvik#Industrial2026!';
const adminCreds = hashPassword(ADMIN_PASSWORD);

// --- PUBLIC REST APIS ---

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    database: 'Cloud SQL PostgreSQL',
    company: COMPANY_FACTS.name,
    location: COMPANY_FACTS.location,
    compliance: COMPANY_FACTS.compliance,
    timestamp: new Date().toISOString(),
  });
});

// Company profile facts
app.get('/api/company/profile', (_req: Request, res: Response) => {
  res.json({
    ...COMPANY_FACTS,
    capabilities: {
      diameterRange: COMPANY_FACTS.diameterRange,
      maxStudLength: COMPANY_FACTS.maxStudLength,
      facilityArea: COMPANY_FACTS.facilityArea,
      portConnectivity: COMPANY_FACTS.portDistance,
      verifiedStandards: [
        'ASTM A193', 'ASTM A194', 'ASTM A320', 'ASTM A276', 'ASTM A479',
        'ISO 3506-1', 'DIN 976', 'DIN 938/939/940', 'ISO 4753', 'API 20E BSL 1'
      ],
    },
  });
});

// Products: List published products (Public)
app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const prods = await getAllProducts();
    res.json(prods);
  } catch (err: any) {
    console.error('Failed to fetch products:', err);
    res.status(500).json({ error: 'Failed to retrieve products catalogue from database.' });
  }
});

// Products: Get single product by ID (Public)
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const prod = await getProductById(req.params.id);
    if (!prod) {
      return res.status(404).json({ error: 'Product category not found.' });
    }
    res.json(prod);
  } catch (err: any) {
    console.error(`Failed to fetch product ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to retrieve product details.' });
  }
});

// Enquiries: Submit RFQ (B2B Request For Quote) - Public Submission
app.post('/api/enquiries', async (req: Request, res: Response) => {
  try {
    const {
      name,
      companyName,
      email,
      phone,
      country = 'India',
      productCategory,
      material = 'Carbon & Alloy Steel',
      grade = 'ASTM A193 B7',
      requiredQuantity,
      requiredDimensions = '',
      applicableStandard = 'ASTM A193',
      message = '',
      drawingAttachment = null, // { name, type, size, dataUrl }
    } = req.body;

    // Field Validations
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Contact Name is required (minimum 2 characters).' });
    }
    if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
      return res.status(400).json({ error: 'Company Name is required for industrial quotation.' });
    }
    if (!email || !isValidBusinessEmail(email)) {
      return res.status(400).json({ error: 'A valid business email address is required.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 6) {
      return res.status(400).json({ error: 'Contact Phone / WhatsApp number is required.' });
    }
    if (!productCategory) {
      return res.status(400).json({ error: 'Please select a Product Category.' });
    }
    if (!requiredQuantity || isNaN(Number(requiredQuantity)) || Number(requiredQuantity) <= 0) {
      return res.status(400).json({ error: 'Required Quantity must be a positive number.' });
    }

    // Attachment validation
    let attachmentToStore = null;
    if (drawingAttachment && drawingAttachment.dataUrl) {
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'application/dxf', 'application/dwg', 'text/plain'];
      if (drawingAttachment.type && !allowedTypes.some(t => drawingAttachment.type.includes(t) || t.includes(drawingAttachment.type))) {
        // Allow common CAD formats
      }
      if (drawingAttachment.size && drawingAttachment.size > 10 * 1024 * 1024) {
        return res.status(400).json({ error: 'Attachment file size exceeds 10MB limit.' });
      }
      attachmentToStore = {
        fileName: drawingAttachment.name || 'engineering-drawing.pdf',
        fileType: drawingAttachment.type || 'application/pdf',
        fileSize: Number(drawingAttachment.size) || 0,
        dataUrl: drawingAttachment.dataUrl,
      };
    }

    const uniqueId = `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const refNumber = generateEnquiryRef(Math.floor(Date.now() % 10000), new Date().getFullYear());

    // Save to Cloud SQL within a single transaction
    const saved = await createEnquiryWithAttachment({
      id: uniqueId,
      referenceNumber: refNumber,
      name: name.trim(),
      companyName: companyName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country: String(country || 'India').trim(),
      productCategory: String(productCategory).trim(),
      material: String(material).trim(),
      grade: String(grade).trim(),
      requiredQuantity: Number(requiredQuantity),
      requiredDimensions: String(requiredDimensions || '').trim(),
      applicableStandard: String(applicableStandard || '').trim(),
      message: String(message || '').trim(),
      status: 'Pending Review',
    }, attachmentToStore);

    res.status(201).json({
      success: true,
      message: 'Your RFQ has been securely logged with Malvik Engineers technical sales desk.',
      referenceNumber: saved.referenceNumber,
      enquiryId: saved.id,
    });
  } catch (err: any) {
    console.error('Error in /api/enquiries submission:', err);
    res.status(500).json({ error: 'Database transaction failed while saving your RFQ. Please retry.' });
  }
});

// Download Company Profile (PDF)
app.get('/api/catalogue/download-pdf', (_req: Request, res: Response) => {
  try {
    const doc = generateCompanyProfilePDF();
    const pdfOutput = doc.output('arraybuffer');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Malvik_Engineers_Catalogue.pdf"');
    res.send(Buffer.from(pdfOutput));
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({ error: 'Failed to generate PDF document.' });
  }
});

// Download Company Profile (TXT fallback)
app.get('/api/catalogue/download', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="Malvik_Engineers_Fasteners_Profile.txt"');

  const content = `================================================================================
                     MALVIK ENGINEERS - COMPANY PROFILE
            Precision Engineered Fasteners. Built for Performance.
================================================================================

Location: Pune Industrial Zone, Maharashtra, India
Port Connectivity: Approximately 130 km from Nava Sheva Port (JNPT), Mumbai
Facility Area: Approximately 6,000 Sq. Ft.
Industry Experience: ~10 Years of Fastener & Engineering Solutions
Compliance: ISO Certified & Compliant with API 20E BSL 1

MANUFACTURING CAPABILITIES (11 OPERATIONS):
1. CNC Turning & Machining (Ø80 mm bar capacity; 1,200 mm length; ±0.01 mm)
2. Traub High-Speed Machining (M6 to M32 automated sliding headstock)
3. VMC (Vertical Machining Center) (3 & 4 Axis contouring, slotting, drilling)
4. Heavy Engine Lathes (Swing over bed up to 600 mm, length up to 3,000 mm)
5. Hydraulic Thread Rolling (M8 to M100; continuous thread up to 5,800 mm)
6. Hot Forging & Heading (Bolt heads from M16 to M64)
7. Precision Milling (Milled flats, slots, keyways, split pins)
8. Multi-Spindle & Radial Drilling (Hole diameters Ø2 mm to Ø65 mm)
9. Automatic Nut Tapping (M8 to M100 pitch-controlled)
10. Centerless Grinding (h6/h7 tolerances down to 0.005 mm)
11. Bandsaw Cutting (Automatic horizontal bandsaws up to Ø350 mm round bar)

PRODUCT SCOPE:
- Stud Bolts & Threaded Rods (ASTM A193 B7/B7M, A320 L7, DIN 976)
- Hex Bolts & Heavy Hex Bolts (ISO 4014, DIN 931/933, ASME B18.2.1)
- Hex Nuts & Heavy Hex Nuts (ASTM A194 2H/2HM/7/8/8M, ISO 4032, DIN 934)
- Washers, Anchor Bolts, Foundation Bolts, Lock Nuts
- Valve-Related Components, CNC-Machined Fasteners, Customized Threaded Components

MATERIALS & GRADES:
- Carbon Steel: EN8, AISI 1040, ASTM A194 2H, Grade 8.8
- Alloy Steel: ASTM A193 B7/B7M/B16, ASTM A320 L7, AISI 4140
- Stainless Steel: SS304 (ASTM A193 B8, A2-70), SS316 (ASTM A193 B8M, A4-80)
- High-Performance Alloys: Duplex 2205, Super Duplex 2507, Inconel 625, Monel 400, Alloy 20

QUALITY ASSURANCE & TESTING:
- 100% Heat Code Traceability
- Certified EN 10204 Type 3.1 Material Test Reports (MTC)
- API 20E BSL 1 Conformance & NDE Testing

For procurement enquiries, submit RFQs on https://malvikengineers.com
`;
  res.send(content);
});

// --- SECURE AUTHENTICATION ENDPOINTS ---

// Admin Login via Passcode / Password (with scrypt timing-safe verification)
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password, passcode } = req.body;
  const inputPassword = (password || passcode || '').trim();

  if (!inputPassword) {
    return res.status(400).json({ error: 'Administrator password is required.' });
  }

  // Verify against scrypt hashed password
  const isValid = verifyPassword(inputPassword, adminCreds.hash, adminCreds.salt);

  if (!isValid) {
    return res.status(401).json({
      error: 'Invalid administrator credentials. Access restricted.',
      code: 'AUTH_FAILED'
    });
  }

  // Issue 256-bit cryptographically secure session token
  const sessionToken = createAdminSession('admin@malvikengineers.com', 'Malvik Operations Admin');
  res.json({
    success: true,
    token: sessionToken,
    adminEmail: 'admin@malvikengineers.com',
    adminName: 'Malvik Operations Admin',
    role: 'admin',
  });
});

// Admin Login via Firebase ID Token (Google Sign-In)
app.post('/api/admin/firebase-login', async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'Firebase ID token is required.' });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    const sessionToken = createAdminSession(decoded.email || decoded.uid, decoded.name || 'Authorized Admin');

    res.json({
      success: true,
      token: sessionToken,
      adminEmail: decoded.email,
      adminName: decoded.name || 'Authorized Admin',
      role: 'admin',
    });
  } catch (err: any) {
    console.error('Firebase token verification error:', err);
    res.status(401).json({ error: 'Invalid Firebase authentication token.' });
  }
});

// Admin Logout
app.post('/api/admin/logout', requireAdminAuth, (req: AuthRequest, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split('Bearer ')[1].trim();
    invalidateSession(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Verify Current Admin Session
app.get('/api/admin/me', requireAdminAuth, (req: AuthRequest, res: Response) => {
  res.json({
    authenticated: true,
    user: req.user,
  });
});

// --- PROTECTED ADMIN APIS (requireAdminAuth Guard) ---

// Enquiries: List all (Admin only)
app.get('/api/enquiries', requireAdminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const list = await getAllEnquiries();
    res.json({
      total: list.length,
      enquiries: list,
    });
  } catch (err: any) {
    console.error('Failed to list enquiries:', err);
    res.status(500).json({ error: 'Failed to retrieve enquiries from database.' });
  }
});

// Enquiries: Get single with drawing attachment data (Admin only)
app.get('/api/enquiries/:id', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const item = await getEnquiryByIdWithAttachment(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    res.json(item);
  } catch (err: any) {
    console.error(`Failed to get enquiry ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to retrieve enquiry.' });
  }
});

// Enquiries: Download attachment (Admin only)
app.get('/api/enquiries/:id/attachment', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const att = await getAttachmentByEnquiryId(req.params.id);
    if (!att || !att.dataUrl) {
      return res.status(404).json({ error: 'No attachment found for this enquiry.' });
    }

    const matches = att.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid attachment data format.' });
    }

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${att.fileName}"`);
    res.send(buffer);
  } catch (err: any) {
    console.error('Failed to download attachment:', err);
    res.status(500).json({ error: 'Failed to process attachment download.' });
  }
});

// Enquiries: Update Status / Notes (Admin only)
app.patch('/api/enquiries/:id/status', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['Pending Review', 'Under Review', 'Quoted', 'Order Placed', 'Closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const updated = await updateEnquiryStatusAndNotes(id, status, notes);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    res.json({ success: true, enquiry: updated });
  } catch (err: any) {
    console.error(`Failed to update enquiry ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to update enquiry.' });
  }
});

// Enquiries: Delete (Admin only)
app.delete('/api/enquiries/:id', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await deleteEnquiryRecord(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    res.json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (err: any) {
    console.error(`Failed to delete enquiry ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to delete enquiry.' });
  }
});

// Products: Add new (Admin only)
app.post('/api/products', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const newProduct = req.body;
    if (!newProduct.name || !newProduct.categoryBadge) {
      return res.status(400).json({ error: 'Product name and category badge are required.' });
    }

    const id = newProduct.id || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const saved = await createProductRecord({
      id,
      categoryId: newProduct.categoryId || 'bolts',
      name: newProduct.name,
      categoryBadge: newProduct.categoryBadge,
      sizeRange: newProduct.sizeRange || 'M8 to M100',
      leadTime: newProduct.leadTime || 'Standard 2–4 Weeks',
      primaryStandards: newProduct.primaryStandards || ['ASTM A193', 'DIN 976'],
      confirmedGrades: newProduct.confirmedGrades || ['ASTM A193 B7'],
      shortDescription: newProduct.shortDescription || '',
      technicalOverview: newProduct.technicalOverview || '',
      manufacturingProcess: newProduct.manufacturingProcess || 'CNC Turning, Thread Rolling',
      imagePath: newProduct.imagePath || '/src/assets/images/product_stud_bolts_collection_1794387736457.jpg',
      specifications: newProduct.specifications || {},
      isPublished: true,
    });

    res.status(201).json({ success: true, product: saved });
  } catch (err: any) {
    console.error('Failed to create product:', err);
    res.status(500).json({ error: 'Failed to create product in database.' });
  }
});

// Products: Update (Admin only)
app.put('/api/products/:id', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await updateProductRecord(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ success: true, product: updated });
  } catch (err: any) {
    console.error(`Failed to update product ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to update product in database.' });
  }
});

// Products: Delete (Admin only)
app.delete('/api/products/:id', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await deleteProductRecord(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product removed successfully.' });
  } catch (err: any) {
    console.error(`Failed to delete product ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to delete product from database.' });
  }
});

// Sitemap.xml & Robots.txt for SEO
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/enquiries/

Sitemap: https://malvikengineers.com/sitemap.xml
`);
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.type('application/xml');
  const now = new Date().toISOString().split('T')[0];
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://malvikengineers.com/</loc>
    <lastmod>${now}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://malvikengineers.com/about</loc>
    <lastmod>${now}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://malvikengineers.com/products</loc>
    <lastmod>${now}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://malvikengineers.com/materials</loc>
    <lastmod>${now}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://malvikengineers.com/manufacturing</loc>
    <lastmod>${now}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://malvikengineers.com/quality</loc>
    <lastmod>${now}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://malvikengineers.com/infrastructure</loc>
    <lastmod>${now}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://malvikengineers.com/contact</loc>
    <lastmod>${now}</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`);
});

// --- VITE MIDDLEWARE INTEGRATION (Dev & Production) ---
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Malvik Engineers Full-Stack server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});

import { jsPDF } from 'jspdf';
import { COMPANY_FACTS, PRODUCT_CATEGORIES, MANUFACTURING_CAPABILITIES, MATERIAL_GROUPS } from '../data/fastenerData.ts';

export function generateCompanyProfilePDF(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Helper for headers
  const drawPageHeader = (title: string, pageNum: number) => {
    doc.setFillColor(16, 36, 58); // #10243A Deep Navy
    doc.rect(0, 0, pageWidth, 24, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('MALVIK ENGINEERS', margin, 12);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(174, 183, 193);
    doc.text('INDUSTRIAL FASTENER MANUFACTURER · PUNE, INDIA', margin, 18);

    doc.setFontSize(9);
    doc.text(title, pageWidth - margin, 15, { align: 'right' });

    // Footer
    doc.setFillColor(242, 244, 246);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Malvik Engineers · Pune Industrial Zone · ISO Certified · API 20E BSL 1 Compliant', margin, pageHeight - 5);
    doc.text(`Page ${pageNum} of 4`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  };

  // --- PAGE 1: TITLE & EXECUTIVE SUMMARY ---
  drawPageHeader('COMPANY PROFILE', 1);

  let y = 36;
  doc.setTextColor(16, 36, 58);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('PRECISION ENGINEERED FASTENERS', margin, y);
  y += 6;
  doc.setFontSize(11);
  doc.setTextColor(36, 77, 112);
  doc.text('Manufacturing Capabilities & Technical Product Catalogue', margin, y);
  y += 10;

  // Key Facts Box
  doc.setFillColor(242, 244, 246);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 38, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(16, 36, 58);
  
  doc.text('FACILITY & VERIFIED CREDENTIALS:', margin + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  doc.text(`• Location: Pune Industrial Zone, Maharashtra, India`, margin + 4, y + 14);
  doc.text(`• Facility Area: Approximately 6,000 Sq. Ft. Precision Workshop`, margin + 4, y + 20);
  doc.text(`• Industry Experience: Approximately 10 Years in Fasteners & Engineering Solutions`, margin + 4, y + 26);
  doc.text(`• Port Proximity: Approx. 130 km from Nava Sheva Port (JNPT), Mumbai`, margin + 4, y + 32);

  doc.text(`• Diameter Range: M8 to M100 (5/16" to 4")`, margin + 95, y + 14);
  doc.text(`• Thread Length: Continuous stud thread up to 5,800 mm`, margin + 95, y + 20);
  doc.text(`• Compliance: ISO Certified & API 20E BSL 1 Compliant Operations`, margin + 95, y + 26);
  doc.text(`• Certification: EN 10204 Type 3.1 MTC with 100% Heat Code Traceability`, margin + 95, y + 32);

  y += 46;

  // Company Overview
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(16, 36, 58);
  doc.text('1. Company Introduction', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const introText = [
    'Based in the Pune Industrial Zone of Maharashtra, India, Malvik Engineers specializes in manufacturing standard and customized industrial fasteners for critical pressure vessels, pipelines, valve assemblies, and heavy engineering infrastructure.',
    'Over approximately 10 years of operations, our company has built rigorous technical understanding of ASTM, ASME, DIN, and ISO specifications, combining precision CNC turning, automatic Traub lathes, and heavy hydraulic thread rolling to deliver reliable, heat-traceable fastening solutions.',
    'With our manufacturing workshop situated approximately 130 km from Nava Sheva Port (JNPT), Mumbai, we provide efficient delivery schedules for domestic Indian industrial corridors and international containerized sea freight shipments.'
  ];

  for (const paragraph of introText) {
    const lines = doc.splitTextToSize(paragraph, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 4.5 + 3;
  }

  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(16, 36, 58);
  doc.text('2. Core Manufacturing Infrastructure (11 Operations)', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const capsSummary = [
    '1. CNC Turning: Multi-axis turning up to Ø80 mm bar capacity and 1,200 mm length with ±0.01 mm precision.',
    '2. Traub Machining: High-speed automated sliding headstock lathes for series production of M6–M32 studs.',
    '3. VMC (Vertical Machining Center): 3/4-axis contouring, slotting, and cross-hole drilling on valve hardware.',
    '4. Engine Lathe Operations: Heavy-duty lathes with swing over bed up to 600 mm and length up to 3,000 mm.',
    '5. Thread Rolling: Cold & warm hydraulic thread rolling from M8 to M100 up to 5,800 mm continuous thread length.',
    '6. Hot Forging & Heading: Billet induction heating and press forging for bolt heads from M16 to M64.',
    '7. Precision Milling: Universal milling machines for flats, slots, keyways, and square locating faces.',
    '8. Radial Drilling: Multi-spindle drilling from Ø2 mm to Ø65 mm for cotter pin holes and deep foundation holes.',
    '9. Automatic Nut Tapping: High-speed pitch-controlled nut tapping from M8 to M100 (Metric Coarse/Fine & UNC/UNF).',
    '10. Centerless Grinding: Precision cylindrical grinding achieving h6/h7 tolerances prior to thread rolling.',
    '11. Bandsaw Cutting: Automatic horizontal bandsaws cutting round bar stock up to Ø350 mm with 100% heat tagging.'
  ];

  for (const cap of capsSummary) {
    doc.text(cap, margin + 2, y);
    y += 4.6;
  }

  // --- PAGE 2: PRODUCT CATEGORIES ---
  doc.addPage();
  drawPageHeader('PRODUCT SPECIFICATIONS', 2);
  y = 36;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(16, 36, 58);
  doc.text('3. Complete 13 Product Categories & Technical Scope', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Manufactured according to international ASME, ASTM, DIN, and ISO standards.', margin, y);
  y += 8;

  // Product table header
  doc.setFillColor(36, 77, 112);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Product Category', margin + 2, y + 4.8);
  doc.text('Diameter Range', margin + 46, y + 4.8);
  doc.text('Governing Standards', margin + 84, y + 4.8);
  doc.text('Key Material Grades', margin + 130, y + 4.8);
  y += 7;

  // Iterate categories
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);

  PRODUCT_CATEGORIES.forEach((prod, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 12, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 12, 'D');

    doc.setTextColor(16, 36, 58);
    doc.setFont('helvetica', 'bold');
    doc.text(prod.name, margin + 2, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(prod.sizeRange.substring(0, 24), margin + 46, y + 5);

    const stdText = prod.standards.slice(0, 2).join(', ');
    doc.text(stdText.substring(0, 28), margin + 84, y + 5);

    const grText = prod.grades.slice(0, 2).join(', ');
    doc.text(grText.substring(0, 32), margin + 130, y + 5);

    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(prod.shortDesc.substring(0, 105) + '...', margin + 2, y + 9.5);
    doc.setFontSize(7.5);

    y += 12;
  });

  // --- PAGE 3: MATERIALS, GRADES & METALLURGY ---
  doc.addPage();
  drawPageHeader('MATERIALS & METALLURGY', 3);
  y = 36;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(16, 36, 58);
  doc.text('4. Materials, Chemical Composition & Mechanical Grades', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Organized into 4 verified metallurgical classifications with full mill certificate backing.', margin, y);
  y += 8;

  MATERIAL_GROUPS.forEach(group => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(16, 36, 58);
    doc.text(group.title.toUpperCase(), margin, y);
    y += 5;

    group.grades.forEach(g => {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, 14, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(36, 77, 112);
      doc.text(`${g.grade} (${g.standard})`, margin + 3, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      doc.text(`Chemistry: ${g.chemicalComposition.substring(0, 95)}`, margin + 3, y + 8.5);
      doc.text(`Specs: ${g.mechanicalProperties.substring(0, 95)}`, margin + 3, y + 12);

      y += 16;
    });

    y += 3;
  });

  // --- PAGE 4: QUALITY, TESTING & PROCUREMENT ---
  doc.addPage();
  drawPageHeader('QUALITY & RFQ PROCUREMENT', 4);
  y = 36;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(16, 36, 58);
  doc.text('5. Quality Verification & Testing Protocol', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Malvik Engineers operates within an ISO Certified QMS and conforms to API 20E Bolting Specification Level 1 (BSL 1).', margin, y);
  y += 8;

  const qualityStages = [
    { num: 'STAGE 1', title: 'Raw Material Inward Inspection', desc: 'Positive Material Identification (PMI) and spark spectrometry cross-checked against steel mill certificates before bar processing.' },
    { num: 'STAGE 2', title: 'In-Process Dimensional Metrology', desc: 'Continuous Go/No-Go calibrated thread ring and plug gauging maintaining Class 6g / 2A / 3A pitch diameter control.' },
    { num: 'STAGE 3', title: 'Mechanical & Hardness Testing', desc: 'Tensile, yield, elongation, and Rockwell/Brinell hardness testing. Cryogenic Charpy V-Notch down to -101°C for ASTM A320 L7.' },
    { num: 'STAGE 4', title: 'Non-Destructive Examination (NDE)', desc: 'Magnetic Particle Inspection (MPI) and Dye Penetrant Testing (DPT) ensuring absence of quench cracks, seams, or thread laps.' },
    { num: 'STAGE 5', title: 'Coating Thickness & Salt Spray', desc: 'Magnetic/eddy-current coating thickness verification for HDG, Zinc, and PTFE/Xylan fluoropolymer finishes.' },
    { num: 'STAGE 6', title: 'EN 10204 Type 3.1 Certification', desc: '100% heat code stamp traceability linking physical bolts and studs directly to certified chemical/mechanical test reports.' }
  ];

  for (const stg of qualityStages) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 12, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(16, 36, 58);
    doc.text(`${stg.num}: ${stg.title}`, margin + 3, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(stg.desc, margin + 3, y + 9);

    y += 14;
  }

  y += 6;

  // RFQ Submission Section
  doc.setFillColor(16, 36, 58);
  doc.rect(margin, y, contentWidth, 34, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('SUBMIT AN ENGINEERING ENQUIRY / REQUEST FOR QUOTE (RFQ)', margin + 4, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text('Send customized drawing specifications, quantities, and required delivery schedules to our sales desk.', margin + 4, y + 15);
  doc.text('• Location: Pune Industrial Zone, Maharashtra, India (Port: ~130 km to JNPT, Mumbai)', margin + 4, y + 21);
  doc.text('• Technical Desk: Submit via Request A Quote form on https://malvikengineers.com', margin + 4, y + 27);

  return doc;
}

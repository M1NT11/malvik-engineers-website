import { eq, desc, ilike, or } from 'drizzle-orm';
import { db } from './index.ts';
import { products, categories, enquiries, attachments, users } from './schema.ts';

// Sanitize and wrap errors for security
function handleDbError(operation: string, error: unknown): never {
  console.error(`Database error during ${operation}:`, error);
  throw new Error(`Database operation failed during ${operation}.`, { cause: error });
}

// --- PRODUCTS ---
export async function getAllProducts() {
  try {
    return await db.select().from(products).where(eq(products.isPublished, true)).orderBy(products.name);
  } catch (error) {
    handleDbError('getAllProducts', error);
  }
}

export async function getProductById(id: string) {
  try {
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return rows[0] || null;
  } catch (error) {
    handleDbError(`getProductById(${id})`, error);
  }
}

export async function createProductRecord(data: typeof products.$inferInsert) {
  try {
    const result = await db.insert(products).values(data).returning();
    return result[0];
  } catch (error) {
    handleDbError('createProductRecord', error);
  }
}

export async function updateProductRecord(id: string, updates: Partial<typeof products.$inferInsert>) {
  try {
    const result = await db.update(products).set(updates).where(eq(products.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    handleDbError(`updateProductRecord(${id})`, error);
  }
}

export async function deleteProductRecord(id: string) {
  try {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    handleDbError(`deleteProductRecord(${id})`, error);
  }
}

// --- CATEGORIES ---
export async function getAllCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.orderIndex);
  } catch (error) {
    handleDbError('getAllCategories', error);
  }
}

// --- ENQUIRIES ---
export async function createEnquiryWithAttachment(
  enquiryData: typeof enquiries.$inferInsert,
  attachmentData?: { fileName: string; fileType: string; fileSize: number; dataUrl: string } | null
) {
  try {
    return await db.transaction(async (tx) => {
      const enqResult = await tx.insert(enquiries).values(enquiryData).returning();
      const savedEnquiry = enqResult[0];

      if (attachmentData && attachmentData.dataUrl) {
        await tx.insert(attachments).values({
          enquiryId: savedEnquiry.id,
          fileName: attachmentData.fileName,
          fileType: attachmentData.fileType,
          fileSize: attachmentData.fileSize,
          dataUrl: attachmentData.dataUrl,
        });
      }

      return savedEnquiry;
    });
  } catch (error) {
    handleDbError('createEnquiryWithAttachment', error);
  }
}

export async function getAllEnquiries() {
  try {
    const enqList = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
    const attList = await db.select({
      id: attachments.id,
      enquiryId: attachments.enquiryId,
      fileName: attachments.fileName,
      fileType: attachments.fileType,
      fileSize: attachments.fileSize,
    }).from(attachments);

    const attMap = new Map<string, typeof attList[0]>();
    for (const a of attList) {
      attMap.set(a.enquiryId, a);
    }

    return enqList.map(e => ({
      ...e,
      hasAttachment: attMap.has(e.id),
      attachmentMeta: attMap.get(e.id) || null,
    }));
  } catch (error) {
    handleDbError('getAllEnquiries', error);
  }
}

export async function getEnquiryByIdWithAttachment(id: string) {
  try {
    const enqRows = await db.select().from(enquiries).where(eq(enquiries.id, id)).limit(1);
    if (!enqRows.length) return null;

    const attRows = await db.select().from(attachments).where(eq(attachments.enquiryId, id)).limit(1);
    return {
      ...enqRows[0],
      attachment: attRows[0] || null,
    };
  } catch (error) {
    handleDbError(`getEnquiryByIdWithAttachment(${id})`, error);
  }
}

export async function updateEnquiryStatusAndNotes(id: string, status?: string, internalNotes?: string) {
  try {
    const updates: Partial<typeof enquiries.$inferInsert> = {};
    if (status) updates.status = status;
    if (internalNotes !== undefined) updates.internalNotes = internalNotes;

    const result = await db.update(enquiries).set(updates).where(eq(enquiries.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    handleDbError(`updateEnquiryStatusAndNotes(${id})`, error);
  }
}

export async function deleteEnquiryRecord(id: string) {
  try {
    const result = await db.delete(enquiries).where(eq(enquiries.id, id)).returning();
    return result[0] || null;
  } catch (error) {
    handleDbError(`deleteEnquiryRecord(${id})`, error);
  }
}

export async function getAttachmentByEnquiryId(enquiryId: string) {
  try {
    const rows = await db.select().from(attachments).where(eq(attachments.enquiryId, enquiryId)).limit(1);
    return rows[0] || null;
  } catch (error) {
    handleDbError(`getAttachmentByEnquiryId(${enquiryId})`, error);
  }
}

import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table (authenticated via Firebase Auth)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Product Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  badge: text('badge').notNull(),
  standards: text('standards').notNull(),
  grades: text('grades').notNull(),
  sizeRange: text('size_range').notNull(),
  description: text('description').notNull(),
  orderIndex: integer('order_index').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Products table
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').references(() => categories.id),
  name: text('name').notNull(),
  categoryBadge: text('category_badge').notNull(),
  sizeRange: text('size_range').notNull(),
  leadTime: text('lead_time').notNull(),
  primaryStandards: jsonb('primary_standards').notNull(),
  confirmedGrades: jsonb('confirmed_grades').notNull(),
  shortDescription: text('short_description').notNull(),
  technicalOverview: text('technical_overview').notNull(),
  manufacturingProcess: text('manufacturing_process').notNull(),
  imagePath: text('image_path').notNull(),
  specifications: jsonb('specifications'),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Enquiries (Request For Quote) table
export const enquiries = pgTable('enquiries', {
  id: text('id').primaryKey(),
  referenceNumber: text('reference_number').notNull().unique(),
  name: text('name').notNull(),
  companyName: text('company_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  country: text('country').default('India'),
  productCategory: text('product_category').notNull(),
  material: text('material').notNull(),
  grade: text('grade').notNull(),
  requiredQuantity: integer('required_quantity').notNull(),
  requiredDimensions: text('required_dimensions'),
  applicableStandard: text('applicable_standard'),
  message: text('message'),
  status: text('status').default('Pending Review'),
  internalNotes: text('internal_notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Attachments table for enquiry drawings/specifications
export const attachments = pgTable('attachments', {
  id: serial('id').primaryKey(),
  enquiryId: text('enquiry_id')
    .references(() => enquiries.id, { onDelete: 'cascade' })
    .notNull(),
  fileName: text('file_name').notNull(),
  fileType: text('file_type').notNull(),
  fileSize: integer('file_size').notNull(),
  dataUrl: text('data_url').notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const enquiriesRelations = relations(enquiries, ({ many }) => ({
  attachments: many(attachments),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  enquiry: one(enquiries, {
    fields: [attachments.enquiryId],
    references: [enquiries.id],
  }),
}));

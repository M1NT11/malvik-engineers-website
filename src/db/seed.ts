import { db } from './index.ts';
import { categories, products } from './schema.ts';
import { PRODUCT_CATEGORIES } from '../data/fastenerData.ts';

export async function seedDatabaseIfEmpty() {
  try {
    const existingProducts = await db.select({ id: products.id }).from(products).limit(1);
    if (existingProducts.length > 0) {
      console.log('Database already initialized with products.');
      return;
    }

    console.log('Seeding initial categories and products into Cloud SQL...');

    // Extract unique categories
    const categoryMap = new Map<string, { id: string; name: string; badge: string; standards: string; grades: string; sizeRange: string; description: string }>();

    for (const p of PRODUCT_CATEGORIES) {
      const catId = p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (!categoryMap.has(catId)) {
        categoryMap.set(catId, {
          id: catId,
          name: p.category,
          badge: p.category,
          standards: p.standards.slice(0, 3).join(', '),
          grades: p.grades.slice(0, 3).join(', '),
          sizeRange: p.sizeRange,
          description: p.shortDesc,
        });
      }
    }

    for (const cat of categoryMap.values()) {
      await db.insert(categories).values(cat).onConflictDoNothing();
    }

    for (const p of PRODUCT_CATEGORIES) {
      const catId = p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await db.insert(products).values({
        id: p.id,
        categoryId: catId,
        name: p.name,
        categoryBadge: p.category,
        sizeRange: p.sizeRange,
        leadTime: 'Standard 2–4 Weeks / Fast-track available',
        primaryStandards: p.standards,
        confirmedGrades: p.grades,
        shortDescription: p.shortDesc,
        technicalOverview: p.overview,
        manufacturingProcess: p.manufacturingProcesses.join(', '),
        imagePath: p.image,
        specifications: {
          materials: p.materials,
          coatings: p.coatings,
          applications: p.applications,
          specTable: p.specTable,
          customizationNotes: p.customizationNotes,
        },
        isPublished: true,
      }).onConflictDoNothing();
    }

    console.log(`Seeded ${PRODUCT_CATEGORIES.length} products into Cloud SQL.`);
  } catch (error) {
    console.error('Error during initial database seeding:', error);
  }
}

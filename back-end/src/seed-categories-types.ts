import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { categories, types } from './drizzle/schema/schema';
import * as schema from '../src/drizzle/schema/schema';

// Load environment variables
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seedCategoriesAndTypes() {
  try {
    console.log('🌱 Starting categories and types seeding...');

    // Insert Categories
    console.log('📁 Inserting categories...');
    const insertedCategories = await db
      .insert(categories)
      .values([
        {
          name: 'Networking',
          description: 'Network infrastructure equipment',
        },
        {
          name: 'Printers',
          description: 'Printing and scanning devices',
        },
        {
          name: 'Computers',
          description: 'Desktop and laptop computers',
        },
        {
          name: 'Projectors',
          description: 'Display projection equipment',
        },
        {
          name: 'Cameras',
          description: 'Security and surveillance cameras',
        },
        {
          name: 'Servers',
          description: 'Server hardware and accessories',
        },
        {
          name: 'IP Phones',
          description: 'Internet Protocol telephony devices',
        },
        {
          name: 'Racks',
          description: 'Equipment racks and enclosures',
        },

      ])
      .returning();

    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Get category IDs for reference
    const networkingCategory = insertedCategories.find(
      (c) => c.name === 'Networking',
    );
    const printersCategory = insertedCategories.find(
      (c) => c.name === 'Printers',
    );
    const computersCategory = insertedCategories.find(
      (c) => c.name === 'Computers',
    );
    const projectorsCategory = insertedCategories.find(
      (c) => c.name === 'Projectors',
    );
    const camerasCategory = insertedCategories.find(
      (c) => c.name === 'Cameras',
    );

    // Insert Types
    console.log('🏷️  Inserting types...');
    const insertedTypes = await db
      .insert(types)
      .values([
        // Networking types
        {
          name: 'Switches',
          categoryId: networkingCategory!.id,
          description: 'Network switches for data routing',
        },
        {
          name: 'Access Points',
          categoryId: networkingCategory!.id,
          description: 'Wireless access points',
        },
        {
          name: 'Routers',
          categoryId: networkingCategory!.id,
          description: 'Network routers',
        },
        {
          name: 'NVRs',
          categoryId: networkingCategory!.id,
          description: 'Network Video Recorders',
        },
        // Printers types
        {
          name: 'Printer',
          categoryId: printersCategory!.id,
          description: 'Standard printers',
        },
        {
          name: 'Scanner',
          categoryId: printersCategory!.id,
          description: 'Document scanners',
        },
        {
          name: 'Copier',
          categoryId: printersCategory!.id,
          description: 'Copy machines',
        },
        // Computers types
        {
          name: 'Desktops',
          categoryId: computersCategory!.id,
          description: 'Desktop computers',
        },
        {
          name: 'Laptops',
          categoryId: computersCategory!.id,
          description: 'Laptop computers',
        },
        // Projectors types
        {
          name: 'Interactive',
          categoryId: projectorsCategory!.id,
          description: 'Interactive projectors',
        },
        {
          name: 'Long Throw',
          categoryId: projectorsCategory!.id,
          description: 'Long throw projectors',
        },
        // Cameras types
        {
          name: 'Internal',
          categoryId: camerasCategory!.id,
          description: 'Indoor security cameras',
        },
        {
          name: 'External',
          categoryId: camerasCategory!.id,
          description: 'Outdoor security cameras',
        },
      ])
      .returning();

    console.log(`✅ Inserted ${insertedTypes.length} types`);

    console.log('\n📊 Seeding Summary:');
    console.log(`   - Categories: ${insertedCategories.length}`);
    console.log(`   - Types: ${insertedTypes.length}`);
    console.log('\n✨ Categories and Types seeding completed successfully!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories and types:', error);
    await pool.end();
    process.exit(1);
  }
}

seedCategoriesAndTypes();

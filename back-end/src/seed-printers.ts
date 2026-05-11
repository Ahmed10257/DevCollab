import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from '../src/drizzle/schema/schema';

// Load environment variables
dotenv.config();

const pool = new Pool({
connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seedPrinters() {
try {
console.log('🌱 Starting printers seeding...\n');

// Get all data
const categories = await db.query.categories.findMany();
const types = await db.query.types.findMany();
const manufacturers = await db.query.manufacturers.findMany();
const branches = await db.query.branches.findMany();
const buildings = await db.query.buildings.findMany();
const users = await db.query.users.findMany();

// Find required items
const printersCategory = categories.find((c) => c.name === 'Printers');
if (!printersCategory) {
console.log('❌ Printers category not found');
process.exit(1);
}

const printerType = types.find((t) => t.name === 'Printer');
const scannerType = types.find((t) => t.name === 'Scanner');
const copierType = types.find((t) => t.name === 'Copier');
const hpManufacturer = manufacturers.find(
(m) => m.name === 'HP (Hewlett-Packard)',
);
const canonManufacturer = manufacturers.find((m) => m.name === 'Canon');
const mainBranch = branches[0];
const mainBuilding = buildings[0];

// Create sample printer assets
console.log('📦 Creating printer assets...');

const printer1Asset = await db
.insert(schema.assets)
.values({
name: 'HP LaserJet Pro Printer',
categoryId: printersCategory.id,
typeId: printerType!.id,
serialNumber: 'PRINT-HP-001',
manufacturerId: hpManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-09-20',
warrantyExpiry: '2024-09-20',
responsibleUserId: users[0]?.id,
})
.returning();

const printer2Asset = await db
.insert(schema.assets)
.values({
name: 'Canon ImageRunner Copier',
categoryId: printersCategory.id,
typeId: copierType!.id,
serialNumber: 'COPY-CANON-001',
manufacturerId: canonManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-07-10',
warrantyExpiry: '2025-07-10',
responsibleUserId: users[0]?.id,
})
.returning();

const printer3Asset = await db
.insert(schema.assets)
.values({
name: 'HP ScanJet Pro Scanner',
categoryId: printersCategory.id,
typeId: scannerType!.id,
serialNumber: 'SCAN-HP-001',
manufacturerId: hpManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2023-01-05',
warrantyExpiry: '2025-01-05',
responsibleUserId: users[0]?.id,
})
.returning();

console.log(`✅ Created 3 printer assets\n`);

// Create printer details
console.log('⚙️  Creating printer details...');

await db.insert(schema.printers).values({
assetId: printer1Asset[0].id,
printerType: 'Printer',
printTechnology: 'Laser',
colorCapability: 'Color',
maxPrintSpeed: '35ppm',
resolution: '1200x1200',
paperSize: 'A4, Legal',
maxPaperCapacity: '500',
tonerCartridgeModel: 'CF530A',
networked: true,
ipAddress: '192.168.1.50',
macAddress: '00:1A:2B:3C:4D:5F',
currentTonerLevel: '85%',
totalPagesPrinted: 15000,
});

await db.insert(schema.printers).values({
assetId: printer2Asset[0].id,
printerType: 'Copier',
printTechnology: 'Laser',
colorCapability: 'Color',
maxPrintSpeed: '50ppm',
resolution: '1200x1200',
paperSize: 'A3, A4, Legal',
maxPaperCapacity: '1000',
tonerCartridgeModel: 'CANON-C-EXV55',
networked: true,
ipAddress: '192.168.1.51',
macAddress: '00:1A:2B:3C:4D:60',
currentTonerLevel: '92%',
totalPagesPrinted: 250000,
});

await db.insert(schema.printers).values({
assetId: printer3Asset[0].id,
printerType: 'Scanner',
printTechnology: 'Inkjet',
colorCapability: 'Color',
maxPrintSpeed: '25ppm',
resolution: '4800x4800',
paperSize: 'A4, A3, Photo Paper',
maxPaperCapacity: '200',
tonerCartridgeModel: 'HP-905XL',
networked: true,
ipAddress: '192.168.1.52',
macAddress: '00:1A:2B:3C:4D:61',
currentTonerLevel: '70%',
totalPagesPrinted: 8000,
});

console.log(`✅ Created 3 printer details\n`);
console.log('✨ Printers seeding completed successfully!\n');
} catch (error) {
console.error('❌ Error seeding printers:', error);
process.exit(1);
}
}

seedPrinters().finally(() => pool.end());

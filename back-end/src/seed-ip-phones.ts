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

async function seedIpPhones() {
try {
console.log('🌱 Starting IP phones seeding...\n');

// Get all data
const categories = await db.query.categories.findMany();
const types = await db.query.types.findMany();
const manufacturers = await db.query.manufacturers.findMany();
const branches = await db.query.branches.findMany();
const buildings = await db.query.buildings.findMany();
const users = await db.query.users.findMany();

// Find required items
const ipPhonesCategory = categories.find((c) => c.name === 'IP Phones');
if (!ipPhonesCategory) {
console.log('❌ IP Phones category not found');
process.exit(1);
}

const deskPhoneType = types.find((t) => t.name === 'Desk Phone');
const conferencePhoneType = types.find((t) => t.name === 'Conference Phone');
const ciscoManufacturer = manufacturers.find((m) => m.name === 'Cisco');
const mainBranch = branches[0];
const mainBuilding = buildings[0];

// Create sample IP phone assets
console.log('📦 Creating IP phone assets...');

// Create desk phones
for (let i = 1; i <= 5; i++) {
const phoneAsset = await db
.insert(schema.assets)
.values({
name: `Cisco IP Desk Phone 0${i}`,
categoryId: ipPhonesCategory.id,
typeId: deskPhoneType!.id,
serialNumber: `PHONE-DESK-00${i}`,
manufacturerId: ciscoManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-11-10',
warrantyExpiry: '2025-11-10',
responsibleUserId: users[0]?.id,
})
.returning();

await db.insert(schema.ipPhones).values({
assetId: phoneAsset[0].id,
phoneType: 'Desk Phone',
phoneSystem: 'Cisco Unified Communications',
lines: 3,
displayType: 'Color LCD',
screenSize: '3.5 inch',
speakers: 1,
microphones: 1,
hasVideoSupport: false,
codec: 'G.711, G.729, G.722',
powerSupply: 'PoE',
ipAddress: `192.168.1.15${i}`,
extensionNumber: `200${i}`,
registrationStatus: 'Registered',
});
}

// Create conference phones
const conferenceAsset = await db
.insert(schema.assets)
.values({
name: 'Cisco IP Conference Phone',
categoryId: ipPhonesCategory.id,
typeId: conferencePhoneType!.id,
serialNumber: 'PHONE-CONF-001',
manufacturerId: ciscoManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-12-01',
warrantyExpiry: '2025-12-01',
responsibleUserId: users[0]?.id,
})
.returning();

await db.insert(schema.ipPhones).values({
assetId: conferenceAsset[0].id,
phoneType: 'Conference Phone',
phoneSystem: 'Cisco Unified Communications',
lines: 6,
displayType: 'LED',
screenSize: '7 inch',
speakers: 4,
microphones: 6,
hasVideoSupport: true,
codec: 'G.711, G.729, G.722, Opus',
powerSupply: 'PoE',
ipAddress: '192.168.1.160',
extensionNumber: '3000',
registrationStatus: 'Registered',
});

console.log(`✅ Created 6 IP phone assets and details\n`);
console.log('✨ IP phones seeding completed successfully!\n');
} catch (error) {
console.error('❌ Error seeding IP phones:', error);
process.exit(1);
}
}

seedIpPhones().finally(() => pool.end());

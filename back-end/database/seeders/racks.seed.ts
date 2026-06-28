import type { SeedContext } from '../connection';
import { insertReturning } from '../helpers';


export async function seedRacks({ db, schema }: SeedContext) {
try {
console.log('🌱 Starting racks seeding...\n');

// Get all data
const categories = await db.query.categories.findMany();
const types = await db.query.types.findMany();
const manufacturers = await db.query.manufacturers.findMany();
const branches = await db.query.branches.findMany();
const buildings = await db.query.buildings.findMany();
const users = await db.query.users.findMany();

// Find required items
const racksCategory = categories.find((c) => c.name === 'Racks');
if (!racksCategory) {
console.log('❌ Racks category not found');
throw new Error('Seeding prerequisite not met');
}

const serverRackType = types.find((t) => t.name === 'Server Rack');
const networkRackType = types.find((t) => t.name === 'Network Rack');
const ciscoManufacturer = manufacturers.find((m) => m.name === 'Cisco');
const mainBranch = branches[0];
const mainBuilding = buildings[0];

// Create sample rack assets
console.log('📦 Creating rack assets...');

const rack1Asset = await insertReturning(db, schema.assets, {
name: 'Server Rack 01',
categoryId: racksCategory.id,
typeId: serverRackType!.id,
serialNumber: 'RACK-SERVER-001',
manufacturerId: ciscoManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2021-05-10',
warrantyExpiry: '2024-05-10',
responsibleUserId: users[0]?.id,
});

const rack2Asset = await insertReturning(db, schema.assets, {
name: 'Network Rack 01',
categoryId: racksCategory.id,
typeId: networkRackType!.id,
serialNumber: 'RACK-NETWORK-001',
manufacturerId: ciscoManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2021-06-15',
warrantyExpiry: '2024-06-15',
responsibleUserId: users[0]?.id,
});

console.log(`✅ Created 2 rack assets\n`);

// Create rack details
console.log('⚙️  Creating rack details...');

await db.insert(schema.racks).values({
assetId: rack1Asset[0].id,
rackType: 'Server Rack',
rackHeight: '42U',
rackWidth: '19 inch',
rackDepth: '800mm',
maxLoadCapacity: '1000kg',
currentLoadCapacity: '750kg',
powerDistributionUnits: 2,
coolingCapacity: '15kW',
numberOfVerticalRails: 2,
hasCaster: true,
color: 'Black',
});

await db.insert(schema.racks).values({
assetId: rack2Asset[0].id,
rackType: 'Network Rack',
rackHeight: '48U',
rackWidth: '19 inch',
rackDepth: '1000mm',
maxLoadCapacity: '800kg',
currentLoadCapacity: '600kg',
powerDistributionUnits: 3,
coolingCapacity: '10kW',
numberOfVerticalRails: 2,
hasCaster: true,
color: 'Grey',
});

console.log(`✅ Created 2 rack details\n`);
console.log('✨ Racks seeding completed successfully!\n');
} catch (error) {
console.error('❌ Error seeding racks:', error);
throw error;
}
}


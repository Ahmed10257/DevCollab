import type { SeedContext } from '../connection';
import { insertReturning } from '../helpers';


export async function seedServers({ db, schema }: SeedContext) {
try {
console.log('🌱 Starting servers seeding...\n');

// Get all data
const categories = await db.query.categories.findMany();
const types = await db.query.types.findMany();
const manufacturers = await db.query.manufacturers.findMany();
const branches = await db.query.branches.findMany();
const buildings = await db.query.buildings.findMany();
const users = await db.query.users.findMany();

// Find required items
const serversCategory = categories.find((c) => c.name === 'Servers');
if (!serversCategory) {
console.log('❌ Servers category not found');
throw new Error('Seeding prerequisite not met');
}

const rackServerType = types.find((t) => t.name === 'Rack Server');
const towerServerType = types.find((t) => t.name === 'Tower Server');
const dellManufacturer = manufacturers.find((m) => m.name === 'Dell');
const hpManufacturer = manufacturers.find(
(m) => m.name === 'HP (Hewlett-Packard)',
);
const mainBranch = branches[0];
const mainBuilding = buildings[0];

// Create sample server assets
console.log('📦 Creating server assets...');

// Create first server asset
const server1Asset = await insertReturning(db, schema.assets, {
name: 'Web Server 01',
categoryId: serversCategory.id,
typeId: rackServerType!.id,
serialNumber: 'SRV-RACK-001',
manufacturerId: dellManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-01-15',
warrantyExpiry: '2025-01-15',
responsibleUserId: users[0]?.id,
});

// Create second server asset
const server2Asset = await insertReturning(db, schema.assets, {
name: 'Database Server',
categoryId: serversCategory.id,
typeId: rackServerType!.id,
serialNumber: 'SRV-RACK-002',
manufacturerId: hpManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-06-20',
warrantyExpiry: '2025-06-20',
responsibleUserId: users[0]?.id,
});

// Create third server asset
const server3Asset = await insertReturning(db, schema.assets, {
name: 'Application Server Tower',
categoryId: serversCategory.id,
typeId: towerServerType!.id,
serialNumber: 'SRV-TOWER-001',
manufacturerId: dellManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2023-03-10',
warrantyExpiry: '2026-03-10',
responsibleUserId: users[0]?.id,
});

console.log(`✅ Created 3 server assets\n`);

// Create server details
console.log('⚙️  Creating server details...');

await db.insert(schema.servers).values({
assetId: server1Asset[0].id,
serverType: 'Rack Server',
cpu: 'Intel Xeon E5-2680 v4',
cpuCores: 14,
ram: '128GB DDR4',
storageType: 'SSD',
storageCapacity: '2TB',
powerSupply: '1000W Redundant',
osType: 'Windows Server',
osVersion: '2019',
ipAddress: '192.168.1.100',
dnsName: 'web-server-01.company.local',
virtualizationSupport: 'Hyper-V',
});

await db.insert(schema.servers).values({
assetId: server2Asset[0].id,
serverType: 'Rack Server',
cpu: 'Intel Xeon Platinum 8280',
cpuCores: 28,
ram: '256GB DDR4',
storageType: 'SSD',
storageCapacity: '4TB',
powerSupply: '1500W Redundant',
osType: 'Linux',
osVersion: 'Ubuntu 20.04 LTS',
ipAddress: '192.168.1.101',
dnsName: 'db-server.company.local',
virtualizationSupport: 'KVM',
});

await db.insert(schema.servers).values({
assetId: server3Asset[0].id,
serverType: 'Tower Server',
cpu: 'Intel Xeon E-2386G',
cpuCores: 6,
ram: '64GB DDR4',
storageType: 'SSD',
storageCapacity: '1TB',
powerSupply: '500W',
osType: 'Windows Server',
osVersion: '2016',
ipAddress: '192.168.1.102',
dnsName: 'app-server.company.local',
virtualizationSupport: 'VMware',
});

console.log(`✅ Created 3 server details\n`);
console.log('✨ Servers seeding completed successfully!\n');
} catch (error) {
console.error('❌ Error seeding servers:', error);
throw error;
}
}


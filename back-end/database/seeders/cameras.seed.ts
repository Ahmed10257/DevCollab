import type { SeedContext } from '../connection';
import { insertReturning } from '../helpers';


export async function seedCameras({ db, schema }: SeedContext) {
try {
console.log('🌱 Starting cameras seeding...\n');

// Get all data
const categories = await db.query.categories.findMany();
const types = await db.query.types.findMany();
const manufacturers = await db.query.manufacturers.findMany();
const branches = await db.query.branches.findMany();
const buildings = await db.query.buildings.findMany();
const users = await db.query.users.findMany();

// Find required items
const camerasCategory = categories.find((c) => c.name === 'Cameras');
if (!camerasCategory) {
console.log('❌ Cameras category not found');
throw new Error('Seeding prerequisite not met');
}

const internalType = types.find((t) => t.name === 'Internal');
const externalType = types.find((t) => t.name === 'External');
const ciscoManufacturer = manufacturers.find((m) => m.name === 'Cisco');
const mainBranch = branches[0];
const mainBuilding = buildings[0];

// Create sample camera assets
console.log('📦 Creating camera assets...');

// Create internal cameras
for (let i = 1; i <= 3; i++) {
const cameraAsset = await insertReturning(db, schema.assets, {
name: `Internal Security Camera 0${i}`,
categoryId: camerasCategory.id,
typeId: internalType!.id,
serialNumber: `CAM-INTERNAL-00${i}`,
manufacturerId: ciscoManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-10-05',
warrantyExpiry: '2025-10-05',
responsibleUserId: users[0]?.id,
});

await insertReturning(db, schema.cameras, {
assetId: cameraAsset[0].id,
cameraType: 'Internal',
cameraStyle: 'Dome',
megapixels: '4MP',
sensor: 'CMOS',
lens: '2.8-12mm',
fieldOfView: '120°',
videoCodec: 'H.265',
frameRate: '30fps',
infraredRange: '15m',
waterproof: false,
powerSupply: 'PoE',
ipAddress: `192.168.1.10${i}`,
macAddress: `00:1A:2B:3C:4D:${60 + i}`,
nvrIntegration: 'NVR-001',
});
}

// Create external cameras
for (let i = 1; i <= 2; i++) {
const cameraAsset = await insertReturning(db, schema.assets, {
name: `External Security Camera 0${i}`,
categoryId: camerasCategory.id,
typeId: externalType!.id,
serialNumber: `CAM-EXTERNAL-00${i}`,
manufacturerId: ciscoManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-09-15',
warrantyExpiry: '2025-09-15',
responsibleUserId: users[0]?.id,
});

await insertReturning(db, schema.cameras, {
assetId: cameraAsset[0].id,
cameraType: 'External',
cameraStyle: 'Bullet',
megapixels: '8MP',
sensor: 'CMOS',
lens: '2.8mm',
fieldOfView: '90°',
videoCodec: 'H.264',
frameRate: '30fps',
infraredRange: '30m',
waterproof: true,
powerSupply: 'PoE',
ipAddress: `192.168.1.20${i}`,
macAddress: `00:1A:2B:3C:4D:${70 + i}`,
nvrIntegration: 'NVR-001',
});
}

console.log(`✅ Created 5 camera assets and details\n`);
console.log('✨ Cameras seeding completed successfully!\n');
} catch (error) {
console.error('❌ Error seeding cameras:', error);
throw error;
}
}


import type { SeedContext } from '../connection';
import { insertReturning } from '../helpers';


export async function seedProjectors({ db, schema }: SeedContext) {
try {
console.log('🌱 Starting projectors seeding...\n');

// Get all data
const categories = await db.query.categories.findMany();
const types = await db.query.types.findMany();
const manufacturers = await db.query.manufacturers.findMany();
const branches = await db.query.branches.findMany();
const buildings = await db.query.buildings.findMany();
const users = await db.query.users.findMany();

// Find required items
const projectorsCategory = categories.find((c) => c.name === 'Projectors');
if (!projectorsCategory) {
console.log('❌ Projectors category not found');
throw new Error('Seeding prerequisite not met');
}

const interactiveType = types.find((t) => t.name === 'Interactive');
const longThrowType = types.find((t) => t.name === 'Long Throw');
const epsonManufacturer = manufacturers.find((m) => m.name === 'Epson');
const mainBranch = branches[0];
const mainBuilding = buildings[0];

// Create sample projector assets
console.log('📦 Creating projector assets...');

const projector1Asset = await insertReturning(db, schema.assets, {
name: 'Epson Interactive Projector',
categoryId: projectorsCategory.id,
typeId: interactiveType!.id,
serialNumber: 'PROJ-EPSON-INT-001',
manufacturerId: epsonManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2022-08-15',
warrantyExpiry: '2025-08-15',
responsibleUserId: users[0]?.id,
});

const projector2Asset = await insertReturning(db, schema.assets, {
name: 'Epson Long Throw Projector',
categoryId: projectorsCategory.id,
typeId: longThrowType!.id,
serialNumber: 'PROJ-EPSON-LT-001',
manufacturerId: epsonManufacturer?.id,
branchId: mainBranch?.id,
buildingId: mainBuilding?.id,
status: 'In Use',
purchaseDate: '2023-02-20',
warrantyExpiry: '2026-02-20',
responsibleUserId: users[0]?.id,
});

console.log(`✅ Created 2 projector assets\n`);

// Create projector details
console.log('⚙️  Creating projector details...');

await db.insert(schema.projectors).values({
assetId: projector1Asset[0].id,
projectorType: 'Interactive',
lightSource: 'Laser',
brightness: '5000 lumens',
contrast: '20000:1',
resolution: '1920x1080',
throwRatio: '0.45:1',
lensType: 'Zoom',
displayTechnology: 'DLP',
lampHours: 500,
maxLampHours: 20000,
hasInteractivity: true,
connectivityPorts: 'HDMI, VGA, USB, RS-232',
ipAddress: '192.168.1.80',
});

await db.insert(schema.projectors).values({
assetId: projector2Asset[0].id,
projectorType: 'Long Throw',
lightSource: 'Lamp',
brightness: '3500 lumens',
contrast: '15000:1',
resolution: '1024x768',
throwRatio: '2.0:1',
lensType: 'Fixed',
displayTechnology: '3LCD',
lampHours: 1200,
maxLampHours: 5000,
hasInteractivity: false,
connectivityPorts: 'HDMI, VGA, Component',
ipAddress: '192.168.1.81',
});

console.log(`✅ Created 2 projector details\n`);
console.log('✨ Projectors seeding completed successfully!\n');
} catch (error) {
console.error('❌ Error seeding projectors:', error);
throw error;
}
}


import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { assets, networkingDevices, computers } from './drizzle/schema/schema';
import * as schema from '../src/drizzle/schema/schema';

// Load environment variables
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seedAssets() {
  try {
    console.log('🌱 Starting assets seeding...');

    // Get IDs from existing data (categories, types, users, locations)
    const categories = await db.query.categories.findMany();
    const types = await db.query.types.findMany();
    const users = await db.query.users.findMany();
    const branches = await db.query.branches.findMany();
    const buildings = await db.query.buildings.findMany();
    const floors = await db.query.floors.findMany();
    const rooms = await db.query.rooms.findMany();

    console.log(`Found: ${categories.length} categories, ${types.length} types, ${users.length} users`);
    console.log(`Locations: ${branches.length} branches, ${buildings.length} buildings, ${floors.length} floors, ${rooms.length} rooms`);

    // Find specific category and type IDs
    const networkingCategory = categories.find(c => c.name === 'Networking');
    const computersCategory = categories.find(c => c.name === 'Computers');
    
    const switchType = types.find(t => t.name === 'Switches');
    const routerType = types.find(t => t.name === 'Routers');
    const accessPointType = types.find(t => t.name === 'Access Points');
    const desktopType = types.find(t => t.name === 'Desktops');
    const laptopType = types.find(t => t.name === 'Laptops');

    if (!networkingCategory || !computersCategory) {
      throw new Error('Required categories not found. Please run seed:categories first.');
    }

    // Load manufacturers and models
    console.log('📦 Loading manufacturers and models...');
    const manufacturers = await db.query.manufacturers.findMany();
    const models = await db.query.models.findMany();

    const ciscoManf = manufacturers.find(m => m.name === 'Cisco');
    const hpManf = manufacturers.find(m => m.name === 'HP (Hewlett-Packard)');
    const dellManf = manufacturers.find(m => m.name === 'Dell');
    const lenovoManf = manufacturers.find(m => m.name === 'Lenovo');

    const catalyst2960Model = models.find(m => m.name === 'Catalyst 2960-X Series');
    const aruba2930Model = models.find(m => m.name === 'Aruba 2930F Series');
    const isr4000Model = models.find(m => m.name === 'ISR 4000 Series Router');
    const arubaAP515Model = models.find(m => m.name === 'Aruba AP-515');
    const optiplex7090Model = models.find(m => m.name === 'OptiPlex 7090');
    const thinkcentreM90aModel = models.find(m => m.name === 'ThinkCentre M90a');
    const latitude5420Model = models.find(m => m.name === 'Latitude 5420');
    const thinkpadX1Model = models.find(m => m.name === 'ThinkPad X1 Carbon');

    // Insert Networking Assets
    console.log('🔌 Inserting networking assets...');
    
    // Switches
    const switch1 = await db.insert(assets).values({
      name: 'Cisco Catalyst 2960-X Series',
      categoryId: networkingCategory.id,
      typeId: switchType!.id,
      serialNumber: 'SW-2960X-001',
      manufacturerId: ciscoManf?.id,
      modelId: catalyst2960Model?.id,
      branchId: branches[0]?.id,
      buildingId: buildings[0]?.id,
      floorId: floors[0]?.id,
      roomId: rooms[0]?.id,
      status: 'Active',
      purchaseDate: '2023-01-15',
      warrantyExpiry: '2026-01-15',
      responsibleUserId: users[0]?.id,
      notes: '24-port Gigabit switch',
    }).returning();

    await db.insert(networkingDevices).values({
      assetId: switch1[0].id,
      ipAddress: '192.168.1.10',
      macAddress: '00:1A:2B:3C:4D:5E',
      ports: 24,
      managementInterface: 'https://192.168.1.10',
      firmwareVersion: '15.2(7)E',
    });

    const switch2 = await db.insert(assets).values({
      name: 'HP Aruba 2930F Series',
      categoryId: networkingCategory.id,
      typeId: switchType!.id,
      serialNumber: 'SW-2930F-002',
      manufacturerId: hpManf?.id,
      modelId: aruba2930Model?.id,
      branchId: branches[0]?.id,
      buildingId: buildings[1]?.id,
      floorId: floors[1]?.id,
      roomId: rooms[1]?.id,
      status: 'Active',
      purchaseDate: '2023-03-20',
      warrantyExpiry: '2026-03-20',
      responsibleUserId: users[0]?.id,
      notes: '48-port Gigabit switch',
    }).returning();

    await db.insert(networkingDevices).values({
      assetId: switch2[0].id,
      ipAddress: '192.168.1.11',
      macAddress: '00:1A:2B:3C:4D:5F',
      ports: 48,
      managementInterface: 'https://192.168.1.11',
      firmwareVersion: '16.10.0012',
    });

    // Routers
    const router1 = await db.insert(assets).values({
      name: 'Cisco ISR 4000 Series Router',
      categoryId: networkingCategory.id,
      typeId: routerType!.id,
      serialNumber: 'RTR-ISR4000-001',
      manufacturerId: ciscoManf?.id,
      modelId: isr4000Model?.id,
      branchId: branches[0]?.id,
      buildingId: buildings[0]?.id,
      floorId: floors[2]?.id,
      roomId: rooms[2]?.id,
      status: 'Active',
      purchaseDate: '2022-11-10',
      warrantyExpiry: '2025-11-10',
      responsibleUserId: users[0]?.id,
      notes: 'Main office router',
    }).returning();

    await db.insert(networkingDevices).values({
      assetId: router1[0].id,
      ipAddress: '192.168.1.1',
      macAddress: '00:1A:2B:3C:4D:60',
      ports: 3,
      managementInterface: 'https://192.168.1.1',
      firmwareVersion: '16.12.04',
    });

    // Access Points
    const ap1 = await db.insert(assets).values({
      name: 'HP Aruba AP-515',
      categoryId: networkingCategory.id,
      typeId: accessPointType!.id,
      serialNumber: 'AP-515-001',
      manufacturerId: hpManf?.id,
      modelId: arubaAP515Model?.id,
      branchId: branches[1]?.id,
      buildingId: buildings[2]?.id,
      floorId: floors[2]?.id,
      roomId: rooms[2]?.id,
      status: 'Active',
      purchaseDate: '2023-05-15',
      warrantyExpiry: '2024-05-15',
      responsibleUserId: users[0]?.id,
      notes: 'Floor 1 main area WiFi',
    }).returning();

    await db.insert(networkingDevices).values({
      assetId: ap1[0].id,
      ipAddress: '192.168.1.50',
      macAddress: '00:1A:2B:3C:4D:61',
      managementInterface: 'https://unifi.local',
      firmwareVersion: '6.5.55',
    });

    console.log('✅ Inserted 4 networking assets');

    // Insert Computer Assets
    console.log('💻 Inserting computer assets...');

    // Desktops
    const desktop1 = await db.insert(assets).values({
      name: 'Dell OptiPlex 7090',
      categoryId: computersCategory.id,
      typeId: desktopType!.id,
      serialNumber: 'DT-OPT7090-001',
      manufacturerId: dellManf?.id,
      modelId: optiplex7090Model?.id,
      branchId: branches[0]?.id,
      buildingId: buildings[0]?.id,
      floorId: floors[0]?.id,
      roomId: rooms[3]?.id,
      status: 'In Use',
      purchaseDate: '2023-02-10',
      warrantyExpiry: '2026-02-10',
      responsibleUserId: users[0]?.id,
      assignedUserId: users[1]?.id,
      notes: 'Assigned to IT department',
    }).returning();

    await db.insert(computers).values({
      assetId: desktop1[0].id,
      deviceType: 'Desktop',
      cpu: 'Intel Core i7-11700',
      ram: '32GB DDR4',
      storage: '1TB',
      storageType: 'NVMe SSD',
      gpu: 'Intel UHD Graphics 750',
      hasMonitor: true,
      monitorDetails: 'Dell 24" P2422H',
      operatingSystem: 'Windows 11 Pro',
    });

    const desktop2 = await db.insert(assets).values({
      name: 'Lenovo ThinkCentre M90a',
      categoryId: computersCategory.id,
      typeId: desktopType!.id,
      serialNumber: 'DT-M90A-002',
      manufacturerId: lenovoManf?.id,
      modelId: thinkcentreM90aModel?.id,
      branchId: branches[0]?.id,
      buildingId: buildings[1]?.id,
      floorId: floors[1]?.id,
      roomId: rooms[4]?.id,
      status: 'In Use',
      purchaseDate: '2023-04-05',
      warrantyExpiry: '2026-04-05',
      responsibleUserId: users[0]?.id,
      assignedUserId: users[2]?.id,
      notes: 'HR department workstation',
    }).returning();

    await db.insert(computers).values({
      assetId: desktop2[0].id,
      deviceType: 'Desktop',
      cpu: 'Intel Core i5-11500',
      ram: '16GB DDR4',
      storage: '512GB',
      storageType: 'NVMe SSD',
      gpu: 'Intel UHD Graphics 750',
      hasMonitor: true,
      monitorDetails: 'HP 22" E223',
      operatingSystem: 'Windows 11 Pro',
    });

    // Laptops
    const laptop1 = await db.insert(assets).values({
      name: 'Dell Latitude 5420',
      categoryId: computersCategory.id,
      typeId: laptopType!.id,
      serialNumber: 'LT-LAT5420-001',
      manufacturerId: dellManf?.id,
      modelId: latitude5420Model?.id,
      branchId: branches[1]?.id,
      buildingId: buildings[2]?.id,
      floorId: floors[3]?.id,
      roomId: rooms[5]?.id,
      status: 'In Use',
      purchaseDate: '2023-06-20',
      warrantyExpiry: '2026-06-20',
      responsibleUserId: users[0]?.id,
      assignedUserId: users[3]?.id,
      notes: 'Sales department laptop',
    }).returning();

    await db.insert(computers).values({
      assetId: laptop1[0].id,
      deviceType: 'Laptop',
      cpu: 'Intel Core i7-1185G7',
      ram: '16GB DDR4',
      storage: '512GB',
      storageType: 'NVMe SSD',
      gpu: 'Intel Iris Xe Graphics',
      hasMonitor: false,
      operatingSystem: 'Windows 11 Pro',
    });

    const laptop2 = await db.insert(assets).values({
      name: 'Lenovo ThinkPad X1 Carbon',
      categoryId: computersCategory.id,
      typeId: laptopType!.id,
      serialNumber: 'LT-X1C-002',
      manufacturerId: lenovoManf?.id,
      modelId: thinkpadX1Model?.id,
      branchId: branches[0]?.id,
      buildingId: buildings[0]?.id,
      floorId: floors[2]?.id,
      roomId: rooms[6]?.id,
      status: 'In Use',
      purchaseDate: '2023-08-15',
      warrantyExpiry: '2026-08-15',
      responsibleUserId: users[0]?.id,
      assignedUserId: users[4]?.id,
      notes: 'Executive laptop',
    }).returning();

    await db.insert(computers).values({
      assetId: laptop2[0].id,
      deviceType: 'Laptop',
      cpu: 'Intel Core i7-1165G7',
      ram: '32GB LPDDR4X',
      storage: '1TB',
      storageType: 'NVMe SSD',
      gpu: 'Intel Iris Xe Graphics',
      hasMonitor: false,
      operatingSystem: 'Windows 11 Pro',
    });

    const laptop3 = await db.insert(assets).values({
      name: 'Dell Latitude 5420',
      categoryId: computersCategory.id,
      typeId: laptopType!.id,
      serialNumber: 'LT-LAT5420-003',
      manufacturerId: dellManf?.id,
      modelId: latitude5420Model?.id,
      branchId: branches[1]?.id,
      buildingId: buildings[3]?.id,
      floorId: floors[4]?.id,
      roomId: rooms[7]?.id,
      status: 'Available',
      purchaseDate: '2023-09-10',
      warrantyExpiry: '2026-09-10',
      responsibleUserId: users[0]?.id,
      notes: 'Spare laptop for temporary assignments',
    }).returning();

    await db.insert(computers).values({
      assetId: laptop3[0].id,
      deviceType: 'Laptop',
      cpu: 'Intel Core i5-1135G7',
      ram: '8GB DDR4',
      storage: '256GB',
      storageType: 'NVMe SSD',
      gpu: 'Intel Iris Xe Graphics',
      hasMonitor: false,
      operatingSystem: 'Windows 11 Pro',
    });

    console.log('✅ Inserted 6 computer assets (2 desktops, 4 laptops)');

    console.log('\n📊 Seeding Summary:');
    console.log('   - Networking Assets: 4 (2 switches, 1 router, 1 access point)');
    console.log('   - Computer Assets: 6 (2 desktops, 4 laptops)');
    console.log('   - Total Assets: 10');
    console.log('\n✨ Assets seeding completed successfully!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding assets:', error);
    await pool.end();
    process.exit(1);
  }
}

seedAssets();

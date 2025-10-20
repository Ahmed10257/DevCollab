import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { assets } from './drizzle/schema/schema';
import * as schema from '../src/drizzle/schema/schema';

// Load environment variables
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seedNewAssets() {
  try {
    console.log('🌱 Starting new assets seeding...');

    // Load necessary data
    const categories = await db.query.categories.findMany();
    const types = await db.query.types.findMany();
    const manufacturers = await db.query.manufacturers.findMany();
    const models = await db.query.models.findMany();
    const branches = await db.query.branches.findMany();
    const buildings = await db.query.buildings.findMany();
    const floors = await db.query.floors.findMany();
    const rooms = await db.query.rooms.findMany();
    const users = await db.query.users.findMany();

    console.log(`Found: ${categories.length} categories, ${types.length} types, ${manufacturers.length} manufacturers, ${models.length} models`);
    console.log(`Locations: ${branches.length} branches, ${buildings.length} buildings, ${floors.length} floors, ${rooms.length} rooms`);

    // Get category IDs
    const printersCategory = categories.find(c => c.name === 'Printers');
    const projectorsCategory = categories.find(c => c.name === 'Projectors');
    const camerasCategory = categories.find(c => c.name === 'Cameras');
    const serversCategory = categories.find(c => c.name === 'Servers');
    const ipPhonesCategory = categories.find(c => c.name === 'IP Phones');
    const racksCategory = categories.find(c => c.name === 'Racks');

    // Get type IDs
    const printerType = types.find(t => t.name === 'Printer');
    const scannerType = types.find(t => t.name === 'Scanner');
    const copierType = types.find(t => t.name === 'Copier');
    const interactiveProjectorType = types.find(t => t.name === 'Interactive');
    const longThrowProjectorType = types.find(t => t.name === 'Long Throw');
    const internalCameraType = types.find(t => t.name === 'Internal');
    const externalCameraType = types.find(t => t.name === 'External');
    const rackServerType = types.find(t => t.name === 'Rack Server');
    const deskPhoneType = types.find(t => t.name === 'Desk Phone');
    const conferencePhoneType = types.find(t => t.name === 'Conference Phone');
    const serverRackType = types.find(t => t.name === 'Server Rack');

    // Get manufacturer references
    const epsonManf = manufacturers.find(m => m.name === 'Epson');
    const canonManf = manufacturers.find(m => m.name === 'Canon');
    const hpManf = manufacturers.find(m => m.name === 'HP (Hewlett-Packard)');
    const benqManf = manufacturers.find(m => m.name === 'BenQ');
    const hikvisionManf = manufacturers.find(m => m.name === 'Hikvision');
    const dellManf = manufacturers.find(m => m.name === 'Dell');
    const polycomManf = manufacturers.find(m => m.name === 'Polycom');
    const yealinkManf = manufacturers.find(m => m.name === 'Yealink');
    const ciscoManf = manufacturers.find(m => m.name === 'Cisco');
    const apcManf = manufacturers.find(m => m.name === 'APC (Schneider Electric)');
    const trippliteManf = manufacturers.find(m => m.name === 'Tripp Lite');

    // Get model references
    const epsonWF4830Model = models.find(m => m.modelNumber === 'WF4830');
    const epsonEcoTankModel = models.find(m => m.modelNumber === 'ET4850');
    const hpM611Model = models.find(m => m.modelNumber === 'M611DN');
    const canonDRG2090Model = models.find(m => m.modelNumber === 'DRG2090');
    const hpN9120Model = models.find(m => m.modelNumber === 'N9120FN2');
    const canonIRAC5760Model = models.find(m => m.modelNumber === 'IRA-C5760i');
    const benqMW855Model = models.find(m => m.modelNumber === 'MW855UST+');
    const benqLU9715Model = models.find(m => m.modelNumber === 'LU9715');
    const epsonBL710Model = models.find(m => m.modelNumber === 'BL710Ui');
    const epsonPL1075Model = models.find(m => m.modelNumber === 'PL1075U');
    const hikvisionDS2543Model = models.find(m => m.modelNumber === 'DS2CD2543G2IS');
    const hikvisionDS2385Model = models.find(m => m.modelNumber === 'DS2CD2385G1');
    const hikvisionDS2043Model = models.find(m => m.modelNumber === 'DS2CD2043G2');
    const dellR750Model = models.find(m => m.modelNumber === 'R750');
    const dellR740Model = models.find(m => m.modelNumber === 'R740');
    const polycomVVX450Model = models.find(m => m.modelNumber === 'VVX450');
    const polycomTrio8800Model = models.find(m => m.modelNumber === 'TRIO8800');
    const yealinkT46UModel = models.find(m => m.modelNumber === 'T46U');
    const yealinkCP960Model = models.find(m => m.modelNumber === 'CP960');
    const cisco8861Model = models.find(m => m.modelNumber === '8861');
    const apcAR3100Model = models.find(m => m.modelNumber === 'AR3100');
    const apcAR2400Model = models.find(m => m.modelNumber === 'AR2400');
    const trippliteSR25Model = models.find(m => m.modelNumber === 'SR25UB');
    const trippliteSR42Model = models.find(m => m.modelNumber === 'SR42UBDP');

    console.log('🖨️  Inserting printer assets...');
    
    const printerAssets = await db.insert(assets).values([
      {
        name: 'Epson WorkForce Pro WF-4830 - Office A',
        categoryId: printersCategory!.id,
        typeId: printerType!.id,
        serialNumber: 'PRT-WF4830-001',
        manufacturerId: epsonManf?.id,
        modelId: epsonWF4830Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[0]?.id,
        roomId: rooms[0]?.id,
        status: 'Active',
        purchaseDate: '2024-01-15',
        warrantyExpiry: '2027-01-15',
        responsibleUserId: users[0]?.id,
        notes: 'Main office printer - Color inkjet',
      },
      {
        name: 'HP LaserJet Enterprise M611dn - IT Dept',
        categoryId: printersCategory!.id,
        typeId: printerType!.id,
        serialNumber: 'PRT-M611-001',
        manufacturerId: hpManf?.id,
        modelId: hpM611Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[1]?.id,
        roomId: rooms[5]?.id,
        status: 'Active',
        purchaseDate: '2024-03-20',
        warrantyExpiry: '2027-03-20',
        responsibleUserId: users[1]?.id,
        notes: 'High-speed monochrome printer',
      },
      {
        name: 'Epson EcoTank ET-4850 - Marketing',
        categoryId: printersCategory!.id,
        typeId: printerType!.id,
        serialNumber: 'PRT-ET4850-001',
        manufacturerId: epsonManf?.id,
        modelId: epsonEcoTankModel?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[1]?.id,
        floorId: floors[4]?.id,
        roomId: rooms[15]?.id,
        status: 'Active',
        purchaseDate: '2024-02-10',
        warrantyExpiry: '2027-02-10',
        responsibleUserId: users[2]?.id,
        notes: 'Cartridge-free all-in-one',
      },
    ]).returning();

    console.log('📷 Inserting scanner assets...');
    
    const scannerAssets = await db.insert(assets).values([
      {
        name: 'Canon imageFORMULA DR-G2090 - Records',
        categoryId: printersCategory!.id,
        typeId: scannerType!.id,
        serialNumber: 'SCN-DRG2090-001',
        manufacturerId: canonManf?.id,
        modelId: canonDRG2090Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[0]?.id,
        roomId: rooms[2]?.id,
        status: 'Active',
        purchaseDate: '2024-01-25',
        warrantyExpiry: '2027-01-25',
        responsibleUserId: users[0]?.id,
        notes: 'High-speed production scanner',
      },
      {
        name: 'HP ScanJet Enterprise Flow N9120 - Archive',
        categoryId: printersCategory!.id,
        typeId: scannerType!.id,
        serialNumber: 'SCN-N9120-001',
        manufacturerId: hpManf?.id,
        modelId: hpN9120Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[2]?.id,
        roomId: rooms[8]?.id,
        status: 'Active',
        purchaseDate: '2024-04-05',
        warrantyExpiry: '2027-04-05',
        responsibleUserId: users[1]?.id,
        notes: 'Flatbed scanner for archive department',
      },
    ]).returning();

    console.log('📋 Inserting copier assets...');
    
    const copierAssets = await db.insert(assets).values([
      {
        name: 'Canon imageRUNNER ADVANCE DX C5760i - Main',
        categoryId: printersCategory!.id,
        typeId: copierType!.id,
        serialNumber: 'CPY-C5760-001',
        manufacturerId: canonManf?.id,
        modelId: canonIRAC5760Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[1]?.id,
        roomId: rooms[4]?.id,
        status: 'Active',
        purchaseDate: '2024-02-15',
        warrantyExpiry: '2027-02-15',
        responsibleUserId: users[0]?.id,
        notes: 'Color multifunction copier - 60 ppm',
      },
    ]).returning();

    console.log('📽️  Inserting projector assets...');
    
    const projectorAssets = await db.insert(assets).values([
      {
        name: 'BenQ MW855UST+ - Conference Room A',
        categoryId: projectorsCategory!.id,
        typeId: interactiveProjectorType!.id,
        serialNumber: 'PRJ-MW855-001',
        manufacturerId: benqManf?.id,
        modelId: benqMW855Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[2]?.id,
        roomId: rooms[9]?.id,
        status: 'Active',
        purchaseDate: '2024-01-10',
        warrantyExpiry: '2027-01-10',
        responsibleUserId: users[1]?.id,
        notes: 'Ultra short throw interactive projector',
      },
      {
        name: 'Epson BrightLink 710Ui - Training Room',
        categoryId: projectorsCategory!.id,
        typeId: interactiveProjectorType!.id,
        serialNumber: 'PRJ-BL710-001',
        manufacturerId: epsonManf?.id,
        modelId: epsonBL710Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[1]?.id,
        floorId: floors[5]?.id,
        roomId: rooms[18]?.id,
        status: 'Active',
        purchaseDate: '2024-03-01',
        warrantyExpiry: '2027-03-01',
        responsibleUserId: users[2]?.id,
        notes: 'Touch interactive projector',
      },
      {
        name: 'BenQ LU9715 - Auditorium',
        categoryId: projectorsCategory!.id,
        typeId: longThrowProjectorType!.id,
        serialNumber: 'PRJ-LU9715-001',
        manufacturerId: benqManf?.id,
        modelId: benqLU9715Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[0]?.id,
        roomId: rooms[3]?.id,
        status: 'Active',
        purchaseDate: '2024-02-20',
        warrantyExpiry: '2027-02-20',
        responsibleUserId: users[1]?.id,
        notes: 'BlueCore laser projector - 8000 lumens',
      },
      {
        name: 'Epson Pro L1075U - Large Hall',
        categoryId: projectorsCategory!.id,
        typeId: longThrowProjectorType!.id,
        serialNumber: 'PRJ-PL1075-001',
        manufacturerId: epsonManf?.id,
        modelId: epsonPL1075Model?.id,
        branchId: branches[1]?.id,
        buildingId: buildings[2]?.id,
        floorId: floors[7]?.id,
        roomId: rooms[25]?.id,
        status: 'Active',
        purchaseDate: '2024-04-10',
        warrantyExpiry: '2027-04-10',
        responsibleUserId: users[2]?.id,
        notes: 'Laser projector with 4K - 7000 lumens',
      },
    ]).returning();

    console.log('📹 Inserting camera assets...');
    
    const cameraAssets = await db.insert(assets).values([
      {
        name: 'Hikvision DS-2CD2543G2-IS - Reception',
        categoryId: camerasCategory!.id,
        typeId: internalCameraType!.id,
        serialNumber: 'CAM-INT-001',
        manufacturerId: hikvisionManf?.id,
        modelId: hikvisionDS2543Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[0]?.id,
        roomId: rooms[0]?.id,
        status: 'Active',
        purchaseDate: '2024-01-05',
        warrantyExpiry: '2027-01-05',
        responsibleUserId: users[0]?.id,
        notes: '4MP mini dome with AI detection',
      },
      {
        name: 'Hikvision DS-2CD2385G1 - Hallway 1F',
        categoryId: camerasCategory!.id,
        typeId: internalCameraType!.id,
        serialNumber: 'CAM-INT-002',
        manufacturerId: hikvisionManf?.id,
        modelId: hikvisionDS2385Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[0]?.id,
        roomId: rooms[1]?.id,
        status: 'Active',
        purchaseDate: '2024-01-05',
        warrantyExpiry: '2027-01-05',
        responsibleUserId: users[0]?.id,
        notes: '8MP network turret camera',
      },
      {
        name: 'Hikvision DS-2CD2043G2 - Parking Lot',
        categoryId: camerasCategory!.id,
        typeId: externalCameraType!.id,
        serialNumber: 'CAM-EXT-001',
        manufacturerId: hikvisionManf?.id,
        modelId: hikvisionDS2043Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        status: 'Active',
        purchaseDate: '2024-01-05',
        warrantyExpiry: '2027-01-05',
        responsibleUserId: users[0]?.id,
        notes: '4MP bullet camera - 80m IR',
      },
      {
        name: 'Hikvision DS-2CD2043G2 - Building Entrance',
        categoryId: camerasCategory!.id,
        typeId: externalCameraType!.id,
        serialNumber: 'CAM-EXT-002',
        manufacturerId: hikvisionManf?.id,
        modelId: hikvisionDS2043Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[1]?.id,
        status: 'Active',
        purchaseDate: '2024-01-05',
        warrantyExpiry: '2027-01-05',
        responsibleUserId: users[0]?.id,
        notes: 'Outdoor bullet camera with AI',
      },
    ]).returning();

    console.log('🖥️  Inserting server assets...');
    
    const serverAssets = await db.insert(assets).values([
      {
        name: 'Dell PowerEdge R750 - Production Server',
        categoryId: serversCategory!.id,
        typeId: rackServerType!.id,
        serialNumber: 'SRV-R750-001',
        manufacturerId: dellManf?.id,
        modelId: dellR750Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[3]?.id,
        roomId: rooms[12]?.id,
        status: 'Active',
        purchaseDate: '2024-01-20',
        warrantyExpiry: '2029-01-20',
        responsibleUserId: users[1]?.id,
        notes: '2U rack server - Dual Xeon - 128GB RAM',
      },
      {
        name: 'Dell PowerEdge R740 - Database Server',
        categoryId: serversCategory!.id,
        typeId: rackServerType!.id,
        serialNumber: 'SRV-R740-001',
        manufacturerId: dellManf?.id,
        modelId: dellR740Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[3]?.id,
        roomId: rooms[12]?.id,
        status: 'Active',
        purchaseDate: '2023-06-15',
        warrantyExpiry: '2028-06-15',
        responsibleUserId: users[1]?.id,
        notes: '2U rack server - RAID configured',
      },
    ]).returning();

    console.log('☎️  Inserting IP phone assets...');
    
    const ipPhoneAssets = await db.insert(assets).values([
      {
        name: 'Polycom VVX 450 - CEO Office',
        categoryId: ipPhonesCategory!.id,
        typeId: deskPhoneType!.id,
        serialNumber: 'PHN-VVX450-001',
        manufacturerId: polycomManf?.id,
        modelId: polycomVVX450Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[2]?.id,
        roomId: rooms[10]?.id,
        status: 'Active',
        purchaseDate: '2024-01-10',
        warrantyExpiry: '2027-01-10',
        responsibleUserId: users[0]?.id,
        notes: '12-line business desk phone',
      },
      {
        name: 'Yealink SIP-T46U - Reception',
        categoryId: ipPhonesCategory!.id,
        typeId: deskPhoneType!.id,
        serialNumber: 'PHN-T46U-001',
        manufacturerId: yealinkManf?.id,
        modelId: yealinkT46UModel?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[0]?.id,
        roomId: rooms[0]?.id,
        status: 'Active',
        purchaseDate: '2024-02-01',
        warrantyExpiry: '2027-02-01',
        responsibleUserId: users[0]?.id,
        notes: 'Gigabit IP phone with color screen',
      },
      {
        name: 'Cisco IP Phone 8861 - Manager Office',
        categoryId: ipPhonesCategory!.id,
        typeId: deskPhoneType!.id,
        serialNumber: 'PHN-8861-001',
        manufacturerId: ciscoManf?.id,
        modelId: cisco8861Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[1]?.id,
        roomId: rooms[6]?.id,
        status: 'Active',
        purchaseDate: '2024-03-15',
        warrantyExpiry: '2027-03-15',
        responsibleUserId: users[1]?.id,
        notes: 'Multiplatform IP phone with Wi-Fi',
      },
      {
        name: 'Polycom Trio 8800 - Board Room',
        categoryId: ipPhonesCategory!.id,
        typeId: conferencePhoneType!.id,
        serialNumber: 'PHN-TRIO8800-001',
        manufacturerId: polycomManf?.id,
        modelId: polycomTrio8800Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[2]?.id,
        roomId: rooms[9]?.id,
        status: 'Active',
        purchaseDate: '2024-01-25',
        warrantyExpiry: '2027-01-25',
        responsibleUserId: users[1]?.id,
        notes: 'Smart conference phone with expandable mics',
      },
      {
        name: 'Yealink CP960 - Meeting Room B',
        categoryId: ipPhonesCategory!.id,
        typeId: conferencePhoneType!.id,
        serialNumber: 'PHN-CP960-001',
        manufacturerId: yealinkManf?.id,
        modelId: yealinkCP960Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[1]?.id,
        floorId: floors[4]?.id,
        roomId: rooms[16]?.id,
        status: 'Active',
        purchaseDate: '2024-03-10',
        warrantyExpiry: '2027-03-10',
        responsibleUserId: users[2]?.id,
        notes: 'Conference phone with 360° voice pickup',
      },
    ]).returning();

    console.log('🗄️  Inserting rack assets...');
    
    const rackAssets = await db.insert(assets).values([
      {
        name: 'APC NetShelter SX 42U - Server Room Main',
        categoryId: racksCategory!.id,
        typeId: serverRackType!.id,
        serialNumber: 'RACK-AR3100-001',
        manufacturerId: apcManf?.id,
        modelId: apcAR3100Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[3]?.id,
        roomId: rooms[12]?.id,
        status: 'Active',
        purchaseDate: '2023-12-01',
        warrantyExpiry: '2028-12-01',
        responsibleUserId: users[1]?.id,
        notes: '42U server rack enclosure with cable management',
      },
      {
        name: 'APC NetShelter SV 42U - Server Room Backup',
        categoryId: racksCategory!.id,
        typeId: serverRackType!.id,
        serialNumber: 'RACK-AR2400-001',
        manufacturerId: apcManf?.id,
        modelId: apcAR2400Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[3]?.id,
        roomId: rooms[12]?.id,
        status: 'Active',
        purchaseDate: '2023-12-01',
        warrantyExpiry: '2028-12-01',
        responsibleUserId: users[1]?.id,
        notes: '42U value server rack',
      },
      {
        name: 'Tripp Lite SmartRack 25U - Network Closet 1F',
        categoryId: racksCategory!.id,
        typeId: serverRackType!.id,
        serialNumber: 'RACK-SR25UB-001',
        manufacturerId: trippliteManf?.id,
        modelId: trippliteSR25Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[0]?.id,
        roomId: rooms[1]?.id,
        status: 'Active',
        purchaseDate: '2024-01-15',
        warrantyExpiry: '2029-01-15',
        responsibleUserId: users[1]?.id,
        notes: '25U standard-depth rack enclosure',
      },
      {
        name: 'Tripp Lite SmartRack 42U - Network Closet 2F',
        categoryId: racksCategory!.id,
        typeId: serverRackType!.id,
        serialNumber: 'RACK-SR42UBDP-001',
        manufacturerId: trippliteManf?.id,
        modelId: trippliteSR42Model?.id,
        branchId: branches[0]?.id,
        buildingId: buildings[0]?.id,
        floorId: floors[1]?.id,
        roomId: rooms[5]?.id,
        status: 'Active',
        purchaseDate: '2024-02-01',
        warrantyExpiry: '2029-02-01',
        responsibleUserId: users[1]?.id,
        notes: '42U deep rack enclosure with front/rear doors',
      },
    ]).returning();

    const totalAssets = printerAssets.length + scannerAssets.length + copierAssets.length +
                       projectorAssets.length + cameraAssets.length + serverAssets.length +
                       ipPhoneAssets.length + rackAssets.length;

    console.log('\n📊 Assets Seeding Summary:');
    console.log(`   - Printers: ${printerAssets.length}`);
    console.log(`   - Scanners: ${scannerAssets.length}`);
    console.log(`   - Copiers: ${copierAssets.length}`);
    console.log(`   - Projectors: ${projectorAssets.length}`);
    console.log(`   - Cameras: ${cameraAssets.length}`);
    console.log(`   - Servers: ${serverAssets.length}`);
    console.log(`   - IP Phones: ${ipPhoneAssets.length}`);
    console.log(`   - Racks: ${rackAssets.length}`);
    console.log(`   - Total New Assets: ${totalAssets}`);
    console.log('\n✨ New assets seeding completed successfully!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding new assets:', error);
    await pool.end();
    process.exit(1);
  }
}

seedNewAssets();

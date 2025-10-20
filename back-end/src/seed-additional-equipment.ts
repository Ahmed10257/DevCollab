import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { types, manufacturers, models } from './drizzle/schema/schema';
import * as schema from '../src/drizzle/schema/schema';
import { eq } from 'drizzle-orm';

// Load environment variables
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seedAdditionalEquipment() {
  try {
    console.log('🌱 Starting additional equipment seeding...');

    // Get existing categories
    const categoriesData = await db.query.categories.findMany();
    const serversCategory = categoriesData.find(c => c.name === 'Servers');
    const ipPhonesCategory = categoriesData.find(c => c.name === 'IP Phones');
    const racksCategory = categoriesData.find(c => c.name === 'Racks');

    // Insert missing types
    console.log('🏷️  Inserting missing types...');
    const newTypes = await db
      .insert(types)
      .values([
        {
          name: 'Rack Server',
          categoryId: serversCategory!.id,
          description: 'Rack-mounted servers',
        },
        {
          name: 'Tower Server',
          categoryId: serversCategory!.id,
          description: 'Tower servers',
        },
        {
          name: 'Desk Phone',
          categoryId: ipPhonesCategory!.id,
          description: 'Desk IP phones',
        },
        {
          name: 'Conference Phone',
          categoryId: ipPhonesCategory!.id,
          description: 'Conference room phones',
        },
        {
          name: 'Server Rack',
          categoryId: racksCategory!.id,
          description: 'Standard server racks',
        },
        {
          name: 'Network Rack',
          categoryId: racksCategory!.id,
          description: 'Network equipment racks',
        },
      ])
      .returning()
      .catch((err) => {
        console.log('⚠️  Types might already exist, continuing...');
        return [];
      });

    console.log(`✅ Inserted ${newTypes.length} new types`);

    // Insert new manufacturers
    console.log('🏢 Inserting new manufacturers...');
    const newManufacturers = await db
      .insert(manufacturers)
      .values([
        {
          name: 'BenQ',
          description: 'Taiwanese multinational company specializing in projectors and displays',
          website: 'https://www.benq.com',
          supportEmail: 'support@benq.com',
          supportPhone: '+1-866-600-2367',
        },
        {
          name: 'Polycom',
          description: 'American multinational corporation specializing in voice and video communications',
          website: 'https://www.poly.com',
          supportEmail: 'support@poly.com',
          supportPhone: '+1-800-765-9266',
        },
        {
          name: 'Yealink',
          description: 'Chinese manufacturer of IP phones and video conferencing equipment',
          website: 'https://www.yealink.com',
          supportEmail: 'support@yealink.com',
          supportPhone: '+86-592-5702000',
        },
        {
          name: 'APC (Schneider Electric)',
          description: 'American manufacturer of uninterruptible power supplies and racks',
          website: 'https://www.apc.com',
          supportEmail: 'support@apc.com',
          supportPhone: '+1-800-555-2725',
        },
        {
          name: 'Tripp Lite',
          description: 'American manufacturer of power protection and connectivity solutions',
          website: 'https://www.tripplite.com',
          supportEmail: 'support@tripplite.com',
          supportPhone: '+1-773-869-1234',
        },
      ])
      .returning()
      .catch((err) => {
        console.log('⚠️  Some manufacturers might already exist, continuing...');
        return [];
      });

    console.log(`✅ Inserted ${newManufacturers.length} new manufacturers`);

    // Get all manufacturers (including newly added ones)
    const allManufacturers = await db.query.manufacturers.findMany();
    const benqManf = allManufacturers.find(m => m.name === 'BenQ');
    const polycomManf = allManufacturers.find(m => m.name === 'Polycom');
    const yealinkManf = allManufacturers.find(m => m.name === 'Yealink');
    const apcManf = allManufacturers.find(m => m.name === 'APC (Schneider Electric)');
    const trippliteManf = allManufacturers.find(m => m.name === 'Tripp Lite');
    const epsonManf = allManufacturers.find(m => m.name === 'Epson');
    const canonManf = allManufacturers.find(m => m.name === 'Canon');
    const hpManf = allManufacturers.find(m => m.name === 'HP (Hewlett-Packard)');
    const hikvisionManf = allManufacturers.find(m => m.name === 'Hikvision');
    const ciscoManf = allManufacturers.find(m => m.name === 'Cisco');
    const dellManf = allManufacturers.find(m => m.name === 'Dell');

    // Insert new models
    console.log('📦 Inserting new models...');
    const newModels = await db
      .insert(models)
      .values([
        // BenQ Projector Models
        {
          name: 'MW855UST+',
          manufacturerId: benqManf!.id,
          modelNumber: 'MW855UST+',
          description: 'Ultra short throw interactive projector',
          specifications: '3500 lumens, WXGA, Interactive pen',
        },
        {
          name: 'LU9715',
          manufacturerId: benqManf!.id,
          modelNumber: 'LU9715',
          description: 'BlueCore laser projector',
          specifications: '8000 lumens, WUXGA, Long throw',
        },
        // Epson Projector Models
        {
          name: 'BrightLink 710Ui',
          manufacturerId: epsonManf!.id,
          modelNumber: 'BL710Ui',
          description: 'Ultra short throw interactive projector',
          specifications: '4000 lumens, WUXGA, Touch interactive',
        },
        {
          name: 'Pro L1075U',
          manufacturerId: epsonManf!.id,
          modelNumber: 'PL1075U',
          description: 'Laser projector with 4K enhancement',
          specifications: '7000 lumens, WUXGA, Long throw',
        },
        // Canon Printer/Scanner Models
        {
          name: 'imageFORMULA DR-G2090',
          manufacturerId: canonManf!.id,
          modelNumber: 'DRG2090',
          description: 'Production document scanner',
          specifications: '90 ppm, ADF, Network scan',
        },
        {
          name: 'LBP325x',
          manufacturerId: canonManf!.id,
          modelNumber: 'LBP325X',
          description: 'Color laser printer',
          specifications: '35 ppm, Duplex, PCL/PS',
        },
        // Epson Printer Models
        {
          name: 'EcoTank ET-4850',
          manufacturerId: epsonManf!.id,
          modelNumber: 'ET4850',
          description: 'Cartridge-free all-in-one printer',
          specifications: 'Print, Scan, Copy, Fax, Auto duplex',
        },
        // HP Printer Models
        {
          name: 'LaserJet Enterprise M611dn',
          manufacturerId: hpManf!.id,
          modelNumber: 'M611DN',
          description: 'Monochrome laser printer',
          specifications: '61 ppm, Duplex, Network',
        },
        {
          name: 'ScanJet Enterprise Flow N9120 fn2',
          manufacturerId: hpManf!.id,
          modelNumber: 'N9120FN2',
          description: 'Flatbed document scanner',
          specifications: '120 ppm, Network, Duplex ADF',
        },
        // Polycom IP Phone Models
        {
          name: 'VVX 450',
          manufacturerId: polycomManf!.id,
          modelNumber: 'VVX450',
          description: '12-line business desk phone',
          specifications: 'Color display, HD voice, PoE',
        },
        {
          name: 'Trio 8800',
          manufacturerId: polycomManf!.id,
          modelNumber: 'TRIO8800',
          description: 'Smart conference phone',
          specifications: 'HD voice, Bluetooth, Expandable mics',
        },
        // Yealink IP Phone Models
        {
          name: 'SIP-T46U',
          manufacturerId: yealinkManf!.id,
          modelNumber: 'T46U',
          description: 'Ultra-elegant gigabit IP phone',
          specifications: '16 SIP accounts, Color screen, USB',
        },
        {
          name: 'CP960',
          manufacturerId: yealinkManf!.id,
          modelNumber: 'CP960',
          description: 'Conference phone',
          specifications: 'HD audio, 360° voice pickup, PoE',
        },
        // Cisco IP Phone Models
        {
          name: 'IP Phone 8861',
          manufacturerId: ciscoManf!.id,
          modelNumber: '8861',
          description: 'Multiplatform IP phone',
          specifications: '5-inch color display, HD voice, Wi-Fi',
        },
        // Hikvision Camera Models
        {
          name: 'DS-2CD2543G2-IS',
          manufacturerId: hikvisionManf!.id,
          modelNumber: 'DS2CD2543G2IS',
          description: '4MP AcuSense mini dome camera',
          specifications: 'AI detection, Audio, Indoor, IR',
        },
        // Dell Server Models
        {
          name: 'PowerEdge R750',
          manufacturerId: dellManf!.id,
          modelNumber: 'R750',
          description: '2U rack server',
          specifications: 'Dual Xeon, 128GB RAM, RAID',
        },
        // APC Rack Models
        {
          name: 'NetShelter SX 42U',
          manufacturerId: apcManf!.id,
          modelNumber: 'AR3100',
          description: '42U server rack enclosure',
          specifications: '42U, 600mm width, Cable management',
        },
        {
          name: 'NetShelter SV 42U',
          manufacturerId: apcManf!.id,
          modelNumber: 'AR2400',
          description: '42U value server rack',
          specifications: '42U, Perforated doors, Side panels',
        },
        // Tripp Lite Rack Models
        {
          name: 'SmartRack 25U',
          manufacturerId: trippliteManf!.id,
          modelNumber: 'SR25UB',
          description: '25U standard-depth rack enclosure',
          specifications: '25U, 33.5" depth, Adjustable depth',
        },
        {
          name: 'SmartRack 42U',
          manufacturerId: trippliteManf!.id,
          modelNumber: 'SR42UBDP',
          description: '42U deep rack enclosure',
          specifications: '42U, 48" depth, Front/rear doors',
        },
      ])
      .returning()
      .catch((err) => {
        console.log('⚠️  Some models might already exist:', err.message);
        return [];
      });

    console.log(`✅ Inserted ${newModels.length} new models`);

    console.log('\n📊 Seeding Summary:');
    console.log(`   - New Types: ${newTypes.length}`);
    console.log(`   - New Manufacturers: ${newManufacturers.length}`);
    console.log(`   - New Models: ${newModels.length}`);
    console.log('\n✨ Additional equipment seeding completed successfully!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding additional equipment:', error);
    await pool.end();
    process.exit(1);
  }
}

seedAdditionalEquipment();

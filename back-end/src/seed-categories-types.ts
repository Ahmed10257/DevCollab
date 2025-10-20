import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { categories, types, manufacturers, models } from './drizzle/schema/schema';
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
    const serversCategory = insertedCategories.find(
      (c) => c.name === 'Servers',
    );
    const ipPhonesCategory = insertedCategories.find(
      (c) => c.name === 'IP Phones',
    );
    const racksCategory = insertedCategories.find(
      (c) => c.name === 'Racks',
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
        // Servers types
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
        // IP Phones types
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
        // Racks types
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
      .returning();

    console.log(`✅ Inserted ${insertedTypes.length} types`);

    // Insert Manufacturers
    console.log('🏢 Inserting manufacturers...');
    const insertedManufacturers = await db
      .insert(manufacturers)
      .values([
        {
          name: 'Cisco',
          description: 'American multinational technology conglomerate specializing in networking hardware',
          website: 'https://www.cisco.com',
          supportEmail: 'support@cisco.com',
          supportPhone: '+1-800-553-2447',
        },
        {
          name: 'HP (Hewlett-Packard)',
          description: 'American multinational information technology company',
          website: 'https://www.hp.com',
          supportEmail: 'support@hp.com',
          supportPhone: '+1-800-474-6836',
        },
        {
          name: 'Dell',
          description: 'American multinational computer technology company',
          website: 'https://www.dell.com',
          supportEmail: 'support@dell.com',
          supportPhone: '+1-800-624-9896',
        },
        {
          name: 'Lenovo',
          description: 'Chinese multinational technology company',
          website: 'https://www.lenovo.com',
          supportEmail: 'support@lenovo.com',
          supportPhone: '+1-855-253-6686',
        },
        {
          name: 'Epson',
          description: 'Japanese electronics company specializing in printers and projectors',
          website: 'https://www.epson.com',
          supportEmail: 'support@epson.com',
          supportPhone: '+1-800-463-7766',
        },
        {
          name: 'Canon',
          description: 'Japanese multinational corporation specializing in imaging and optical products',
          website: 'https://www.canon.com',
          supportEmail: 'support@canon.com',
          supportPhone: '+1-800-652-2666',
        },
        {
          name: 'Hikvision',
          description: 'Chinese state-owned manufacturer of video surveillance equipment',
          website: 'https://www.hikvision.com',
          supportEmail: 'support@hikvision.com',
          supportPhone: '+86-571-8807-5998',
        },
        {
          name: 'Ubiquiti',
          description: 'American technology company focused on wireless data communication products',
          website: 'https://www.ui.com',
          supportEmail: 'support@ui.com',
          supportPhone: '+1-408-934-0000',
        },
        {
          name: 'TP-Link',
          description: 'Chinese manufacturer of computer networking products',
          website: 'https://www.tp-link.com',
          supportEmail: 'support@tp-link.com',
          supportPhone: '+1-866-225-8139',
        },
        {
          name: 'Netgear',
          description: 'American computer networking company',
          website: 'https://www.netgear.com',
          supportEmail: 'support@netgear.com',
          supportPhone: '+1-888-638-4327',
        },
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
      .returning();

    console.log(`✅ Inserted ${insertedManufacturers.length} manufacturers`);

    // Get manufacturer references
    const ciscoManf = insertedManufacturers.find(m => m.name === 'Cisco');
    const hpManf = insertedManufacturers.find(m => m.name === 'HP (Hewlett-Packard)');
    const dellManf = insertedManufacturers.find(m => m.name === 'Dell');
    const lenovoManf = insertedManufacturers.find(m => m.name === 'Lenovo');
    const epsonManf = insertedManufacturers.find(m => m.name === 'Epson');
    const canonManf = insertedManufacturers.find(m => m.name === 'Canon');
    const hikvisionManf = insertedManufacturers.find(m => m.name === 'Hikvision');
    const ubiquitiManf = insertedManufacturers.find(m => m.name === 'Ubiquiti');
    const tplinkManf = insertedManufacturers.find(m => m.name === 'TP-Link');
    const netgearManf = insertedManufacturers.find(m => m.name === 'Netgear');
    const benqManf = insertedManufacturers.find(m => m.name === 'BenQ');
    const polycomManf = insertedManufacturers.find(m => m.name === 'Polycom');
    const yealinkManf = insertedManufacturers.find(m => m.name === 'Yealink');
    const apcManf = insertedManufacturers.find(m => m.name === 'APC (Schneider Electric)');
    const trippliteManf = insertedManufacturers.find(m => m.name === 'Tripp Lite');

    // Insert Models
    console.log('📦 Inserting models...');
    const insertedModels = await db
      .insert(models)
      .values([
        // Cisco Models
        {
          name: 'Catalyst 2960-X Series',
          manufacturerId: ciscoManf!.id,
          modelNumber: '2960X',
          description: '24/48-port Gigabit Ethernet switch',
          specifications: 'Layer 2/3, PoE+, Stackable',
        },
        {
          name: 'Catalyst 9300 Series',
          manufacturerId: ciscoManf!.id,
          modelNumber: '9300',
          description: 'Enterprise-class stackable switch',
          specifications: 'Layer 3, PoE++, Modular uplinks',
        },
        {
          name: 'ISR 4000 Series Router',
          manufacturerId: ciscoManf!.id,
          modelNumber: 'ISR4000',
          description: 'Integrated Services Router',
          specifications: 'SD-WAN, Security, Unified Communications',
        },
        // HP Models
        {
          name: 'Aruba 2930F Series',
          manufacturerId: hpManf!.id,
          modelNumber: '2930F',
          description: 'Layer 3 managed switch',
          specifications: '24/48 ports, PoE+, Stacking',
        },
        {
          name: 'Aruba AP-515',
          manufacturerId: hpManf!.id,
          modelNumber: 'AP-515',
          description: 'Wi-Fi 6 access point',
          specifications: 'Tri-radio, 4x4 MU-MIMO',
        },
        // Dell Models
        {
          name: 'OptiPlex 7090',
          manufacturerId: dellManf!.id,
          modelNumber: 'OP7090',
          description: 'Business desktop computer',
          specifications: 'Intel Core i7, 16GB RAM, 512GB SSD',
        },
        {
          name: 'Latitude 5420',
          manufacturerId: dellManf!.id,
          modelNumber: 'LAT5420',
          description: 'Business laptop',
          specifications: '14-inch, Intel Core i5, 8GB RAM',
        },
        {
          name: 'PowerEdge R740',
          manufacturerId: dellManf!.id,
          modelNumber: 'R740',
          description: '2U rack server',
          specifications: 'Dual Xeon, 64GB RAM, RAID',
        },
        // Lenovo Models
        {
          name: 'ThinkCentre M90a',
          manufacturerId: lenovoManf!.id,
          modelNumber: 'M90A',
          description: 'All-in-one desktop',
          specifications: '24-inch, Intel Core i5, 16GB RAM',
        },
        {
          name: 'ThinkPad X1 Carbon',
          manufacturerId: lenovoManf!.id,
          modelNumber: 'X1C',
          description: 'Ultrabook laptop',
          specifications: '14-inch, Intel Core i7, 16GB RAM, 1TB SSD',
        },
        // Epson Models
        {
          name: 'WorkForce Pro WF-4830',
          manufacturerId: epsonManf!.id,
          modelNumber: 'WF4830',
          description: 'All-in-one inkjet printer',
          specifications: 'Print, Scan, Copy, Fax, Duplex',
        },
        {
          name: 'PowerLite L-Series',
          manufacturerId: epsonManf!.id,
          modelNumber: 'PL-SERIES',
          description: 'Laser projector',
          specifications: '6000 lumens, WUXGA, Long-life laser',
        },
        // Canon Models
        {
          name: 'imageRUNNER ADVANCE DX C5760i',
          manufacturerId: canonManf!.id,
          modelNumber: 'IRA-C5760i',
          description: 'Color multifunction printer',
          specifications: '60 ppm, Scan, Copy, Print, Duplex',
        },
        // Hikvision Models
        {
          name: 'DS-2CD2385G1',
          manufacturerId: hikvisionManf!.id,
          modelNumber: 'DS2CD2385G1',
          description: '8MP Network Turret Camera',
          specifications: '4K, H.265+, IR up to 30m, IP67',
        },
        {
          name: 'DS-2CD2043G2',
          manufacturerId: hikvisionManf!.id,
          modelNumber: 'DS2CD2043G2',
          description: '4MP AcuSense Bullet Camera',
          specifications: 'AI detection, IR up to 80m, IP67',
        },
        {
          name: 'DS-7732NI-K4',
          manufacturerId: hikvisionManf!.id,
          modelNumber: 'DS7732NIK4',
          description: '32-channel NVR',
          specifications: '4K recording, H.265+, RAID support',
        },
        // Ubiquiti Models
        {
          name: 'UniFi Dream Machine Pro',
          manufacturerId: ubiquitiManf!.id,
          modelNumber: 'UDM-PRO',
          description: 'All-in-one network solution',
          specifications: 'Router, Switch, Controller, IPS',
        },
        {
          name: 'UniFi 6 Long-Range',
          manufacturerId: ubiquitiManf!.id,
          modelNumber: 'U6-LR',
          description: 'Wi-Fi 6 access point',
          specifications: 'AX3000, Long-range, PoE',
        },
        // TP-Link Models
        {
          name: 'TL-SG3428',
          manufacturerId: tplinkManf!.id,
          modelNumber: 'SG3428',
          description: 'JetStream 28-port switch',
          specifications: 'L2+ managed, 4 SFP slots',
        },
        {
          name: 'EAP660 HD',
          manufacturerId: tplinkManf!.id,
          modelNumber: 'EAP660HD',
          description: 'AX3600 Wireless access point',
          specifications: 'Wi-Fi 6, MU-MIMO, PoE+',
        },
        // Netgear Models
        {
          name: 'Nighthawk AX12',
          manufacturerId: netgearManf!.id,
          modelNumber: 'RAX120',
          description: '12-stream Wi-Fi 6 router',
          specifications: 'AX6000, 8 LAN ports, Multi-Gig',
        },
        // BenQ Models (Projectors)
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
        // Epson Projector Models (additional)
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
        // Canon Printer/Scanner Models (additional)
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
        // Epson Printer Models (additional)
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
        // Hikvision Camera Models (additional)
        {
          name: 'DS-2CD2543G2-IS',
          manufacturerId: hikvisionManf!.id,
          modelNumber: 'DS2CD2543G2IS',
          description: '4MP AcuSense mini dome camera',
          specifications: 'AI detection, Audio, Indoor, IR',
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
      .returning();

    console.log(`✅ Inserted ${insertedModels.length} models`);

    console.log('\n📊 Seeding Summary:');
    console.log(`   - Categories: ${insertedCategories.length}`);
    console.log(`   - Types: ${insertedTypes.length}`);
    console.log(`   - Manufacturers: ${insertedManufacturers.length}`);
    console.log(`   - Models: ${insertedModels.length}`);
    console.log('\n✨ Asset management data seeding completed successfully!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories and types:', error);
    await pool.end();
    process.exit(1);
  }
}

seedCategoriesAndTypes();

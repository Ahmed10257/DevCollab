import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { manufacturers, models } from './drizzle/schema/schema';
import * as schema from './drizzle/schema/schema';

// Load environment variables
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seedManufacturersAndModels() {
  try {
    console.log('🌱 Starting manufacturers and models seeding...');

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
      ])
      .returning();

    console.log(`✅ Inserted ${insertedModels.length} models`);

    console.log('\n📊 Seeding Summary:');
    console.log(`   - Manufacturers: ${insertedManufacturers.length}`);
    console.log(`   - Models: ${insertedModels.length}`);
    console.log('\n✨ Manufacturers and models seeding completed successfully!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding manufacturers and models:', error);
    await pool.end();
    process.exit(1);
  }
}

seedManufacturersAndModels();

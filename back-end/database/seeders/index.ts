import { withDatabase } from '../connection';
import { seedCore } from './core.seed';
import { seedCategoriesTypes } from './categories-types.seed';
import { seedAdditionalEquipment } from './additional-equipment.seed';
import { seedAssets } from './assets.seed';
import { seedServers } from './servers.seed';
import { seedRacks } from './racks.seed';
import { seedPrinters } from './printers.seed';
import { seedProjectors } from './projectors.seed';
import { seedCameras } from './cameras.seed';
import { seedIpPhones } from './ip-phones.seed';

const seeders: Record<string, (ctx: Parameters<typeof seedCore>[0]) => Promise<void>> = {
  core: seedCore,
  categories: seedCategoriesTypes,
  additional: seedAdditionalEquipment,
  assets: seedAssets,
  servers: seedServers,
  racks: seedRacks,
  printers: seedPrinters,
  projectors: seedProjectors,
  cameras: seedCameras,
  'ip-phones': seedIpPhones,
};

const fullSeedOrder = [
  'core',
  'categories',
  'additional',
  'assets',
  'servers',
  'racks',
  'printers',
  'projectors',
  'cameras',
  'ip-phones',
] as const;

async function main() {
  const target = process.argv[2] ?? 'all';

  await withDatabase(async (ctx) => {
    if (target === 'all') {
      for (const name of fullSeedOrder) {
        console.log(`\n${'='.repeat(60)}\n▶ Running ${name} seeder...\n`);
        await seeders[name](ctx);
      }
      return;
    }

    const seeder = seeders[target];
    if (!seeder) {
      throw new Error(
        `Unknown seeder "${target}". Available: ${Object.keys(seeders).join(', ')}, all`,
      );
    }

    await seeder(ctx);
  });
}

main()
  .then(() => {
    console.log('\n👋 Seeding finished.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });

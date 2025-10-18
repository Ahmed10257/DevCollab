import { pgTable, serial, integer, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const computers = pgTable('computers', {
  id: serial('id').primaryKey(),
  assetId: integer('asset_id')
    .notNull()
    .unique()
    .references(() => assets.id, { onDelete: 'cascade' }),
  deviceType: varchar('device_type', { length: 50 }).notNull(), // Desktop or Laptop
  cpu: varchar('cpu', { length: 255 }),
  ram: varchar('ram', { length: 100 }), // e.g., "16GB DDR4"
  storage: varchar('storage', { length: 100 }), // e.g., "512GB"
  storageType: varchar('storage_type', { length: 50 }), // SSD, HDD, NVMe
  gpu: varchar('gpu', { length: 255 }),
  hasMonitor: boolean('has_monitor').default(false),
  monitorDetails: varchar('monitor_details', { length: 255 }), // Size, model, etc.
  operatingSystem: varchar('operating_system', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Computer = typeof computers.$inferSelect;
export type NewComputer = typeof computers.$inferInsert;

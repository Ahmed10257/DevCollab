import { mysqlTable, int, int, varchar, timestamp, boolean } from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const computers = mysqlTable('computers', {
  id: int('id').autoincrement().primaryKey(),
  assetId: int('asset_id')
    .notNull()
    .unique()
    .references(() => assets.id, { onDelete: 'cascade' }),
  deviceType: varchar('device_type', { length: 50 }).notNull(),
  cpu: varchar('cpu', { length: 255 }),
  ram: varchar('ram', { length: 100 }),
  storage: varchar('storage', { length: 100 }),
  storageType: varchar('storage_type', { length: 50 }),
  gpu: varchar('gpu', { length: 255 }),
  hasMonitor: boolean('has_monitor').default(false),
  monitorDetails: varchar('monitor_details', { length: 255 }),
  operatingSystem: varchar('operating_system', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Computer = typeof computers.$inferSelect;
export type NewComputer = typeof computers.$inferInsert;

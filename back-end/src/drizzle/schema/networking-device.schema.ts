import { mysqlTable, int, int, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const networkingDevices = mysqlTable('networking_devices', {
  id: int('id').autoincrement().primaryKey(),
  assetId: int('asset_id')
    .notNull()
    .unique()
    .references(() => assets.id, { onDelete: 'cascade' }),
  ipAddress: varchar('ip_address', { length: 45 }),
  macAddress: varchar('mac_address', { length: 17 }),
  ports: int('ports'),
  managementInterface: varchar('management_interface', { length: 255 }),
  firmwareVersion: varchar('firmware_version', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type NetworkingDevice = typeof networkingDevices.$inferSelect;
export type NewNetworkingDevice = typeof networkingDevices.$inferInsert;

import { pgTable, serial, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const networkingDevices = pgTable('networking_devices', {
  id: serial('id').primaryKey(),
  assetId: integer('asset_id')
    .notNull()
    .unique()
    .references(() => assets.id, { onDelete: 'cascade' }),
  ipAddress: varchar('ip_address', { length: 45 }), // Supports IPv4 and IPv6
  macAddress: varchar('mac_address', { length: 17 }),
  ports: integer('ports'), // Number of ports
  managementInterface: varchar('management_interface', { length: 255 }), // Web interface URL
  firmwareVersion: varchar('firmware_version', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type NetworkingDevice = typeof networkingDevices.$inferSelect;
export type NewNetworkingDevice = typeof networkingDevices.$inferInsert;

import {
mysqlTable,
int,
int,
varchar,
timestamp,
} from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const servers = mysqlTable('servers', {
id: int('id').autoincrement().primaryKey(),
assetId: int('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
serverType: varchar('server_type', { length: 50 }).notNull(),
cpu: varchar('cpu', { length: 255 }),
cpuCores: int('cpu_cores'),
ram: varchar('ram', { length: 100 }),
storageType: varchar('storage_type', { length: 50 }),
storageCapacity: varchar('storage_capacity', { length: 100 }),
powerSupply: varchar('power_supply', { length: 100 }),
osType: varchar('os_type', { length: 100 }),
osVersion: varchar('os_version', { length: 100 }),
ipAddress: varchar('ip_address', { length: 45 }),
dnsName: varchar('dns_name', { length: 255 }),
virtualizationSupport: varchar('virtualization_support', { length: 100 }),
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Server = typeof servers.$inferSelect;
export type NewServer = typeof servers.$inferInsert;

import {
pgTable,
serial,
integer,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const servers = pgTable('servers', {
id: serial('id').primaryKey(),
assetId: integer('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
serverType: varchar('server_type', { length: 50 }).notNull(), // Rack Server or Tower Server
cpu: varchar('cpu', { length: 255 }), // CPU model (e.g., Intel Xeon E5-2680 v4)
cpuCores: integer('cpu_cores'), // Number of cores
ram: varchar('ram', { length: 100 }), // RAM specification (e.g., 128GB DDR4)
storageType: varchar('storage_type', { length: 50 }), // SSD, HDD, SAN, etc.
storageCapacity: varchar('storage_capacity', { length: 100 }), // Total storage (e.g., 2TB)
powerSupply: varchar('power_supply', { length: 100 }), // Power specification (e.g., 1000W Redundant)
osType: varchar('os_type', { length: 100 }), // Windows Server, Linux, etc.
osVersion: varchar('os_version', { length: 100 }), // Specific OS version
ipAddress: varchar('ip_address', { length: 45 }), // Server IP address (IPv4/IPv6)
dnsName: varchar('dns_name', { length: 255 }), // DNS hostname
virtualizationSupport: varchar('virtualization_support', { length: 100 }), // VMware, Hyper-V, KVM, etc.
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Server = typeof servers.$inferSelect;
export type NewServer = typeof servers.$inferInsert;

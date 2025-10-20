"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servers = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.servers = (0, pg_core_1.pgTable)('servers', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    serverType: (0, pg_core_1.varchar)('server_type', { length: 50 }).notNull(), // Rack Server or Tower Server
    cpu: (0, pg_core_1.varchar)('cpu', { length: 255 }), // CPU model (e.g., Intel Xeon E5-2680 v4)
    cpuCores: (0, pg_core_1.integer)('cpu_cores'), // Number of cores
    ram: (0, pg_core_1.varchar)('ram', { length: 100 }), // RAM specification (e.g., 128GB DDR4)
    storageType: (0, pg_core_1.varchar)('storage_type', { length: 50 }), // SSD, HDD, SAN, etc.
    storageCapacity: (0, pg_core_1.varchar)('storage_capacity', { length: 100 }), // Total storage (e.g., 2TB)
    powerSupply: (0, pg_core_1.varchar)('power_supply', { length: 100 }), // Power specification (e.g., 1000W Redundant)
    osType: (0, pg_core_1.varchar)('os_type', { length: 100 }), // Windows Server, Linux, etc.
    osVersion: (0, pg_core_1.varchar)('os_version', { length: 100 }), // Specific OS version
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }), // Server IP address (IPv4/IPv6)
    dnsName: (0, pg_core_1.varchar)('dns_name', { length: 255 }), // DNS hostname
    virtualizationSupport: (0, pg_core_1.varchar)('virtualization_support', { length: 100 }), // VMware, Hyper-V, KVM, etc.
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

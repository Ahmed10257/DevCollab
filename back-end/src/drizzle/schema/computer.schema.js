"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computers = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.computers = (0, pg_core_1.pgTable)('computers', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    deviceType: (0, pg_core_1.varchar)('device_type', { length: 50 }).notNull(), // Desktop or Laptop
    cpu: (0, pg_core_1.varchar)('cpu', { length: 255 }),
    ram: (0, pg_core_1.varchar)('ram', { length: 100 }), // e.g., "16GB DDR4"
    storage: (0, pg_core_1.varchar)('storage', { length: 100 }), // e.g., "512GB"
    storageType: (0, pg_core_1.varchar)('storage_type', { length: 50 }), // SSD, HDD, NVMe
    gpu: (0, pg_core_1.varchar)('gpu', { length: 255 }),
    hasMonitor: (0, pg_core_1.boolean)('has_monitor').default(false),
    monitorDetails: (0, pg_core_1.varchar)('monitor_details', { length: 255 }), // Size, model, etc.
    operatingSystem: (0, pg_core_1.varchar)('operating_system', { length: 100 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

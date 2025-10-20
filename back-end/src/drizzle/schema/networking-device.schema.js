"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkingDevices = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.networkingDevices = (0, pg_core_1.pgTable)('networking_devices', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }), // Supports IPv4 and IPv6
    macAddress: (0, pg_core_1.varchar)('mac_address', { length: 17 }),
    ports: (0, pg_core_1.integer)('ports'), // Number of ports
    managementInterface: (0, pg_core_1.varchar)('management_interface', { length: 255 }), // Web interface URL
    firmwareVersion: (0, pg_core_1.varchar)('firmware_version', { length: 100 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

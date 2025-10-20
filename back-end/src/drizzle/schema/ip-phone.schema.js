"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipPhones = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.ipPhones = (0, pg_core_1.pgTable)('ip_phones', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    phoneType: (0, pg_core_1.varchar)('phone_type', { length: 50 }).notNull(), // Desk Phone or Conference Phone
    phoneSystem: (0, pg_core_1.varchar)('phone_system', { length: 100 }), // Cisco, Avaya, Polycom, etc.
    lines: (0, pg_core_1.integer)('lines'), // Number of supported phone lines
    displayType: (0, pg_core_1.varchar)('display_type', { length: 100 }), // Monochrome, Color, Size
    screenSize: (0, pg_core_1.varchar)('screen_size', { length: 50 }), // Screen resolution/size
    speakers: (0, pg_core_1.integer)('speakers'), // Number of built-in speakers
    microphones: (0, pg_core_1.integer)('microphones'), // Number of built-in microphones
    hasVideoSupport: (0, pg_core_1.boolean)('has_video_support').default(false), // Video calling capability
    codec: (0, pg_core_1.varchar)('codec', { length: 255 }), // Supported codecs (e.g., G.711, G.729)
    powerSupply: (0, pg_core_1.varchar)('power_supply', { length: 50 }), // PoE or AC adapter
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }), // Phone IP address
    extensionNumber: (0, pg_core_1.varchar)('extension_number', { length: 50 }), // Assigned phone extension
    registrationStatus: (0, pg_core_1.varchar)('registration_status', { length: 50 }), // Registered, Unregistered, etc.
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

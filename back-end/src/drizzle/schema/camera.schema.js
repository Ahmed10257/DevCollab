"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cameras = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.cameras = (0, pg_core_1.pgTable)('cameras', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    cameraType: (0, pg_core_1.varchar)('camera_type', { length: 50 }).notNull(), // Internal or External
    cameraStyle: (0, pg_core_1.varchar)('camera_style', { length: 50 }), // Dome, Bullet, Turret, etc.
    megapixels: (0, pg_core_1.varchar)('megapixels', { length: 50 }), // Camera resolution (e.g., 4MP, 8MP)
    sensor: (0, pg_core_1.varchar)('sensor', { length: 50 }), // CMOS or CCD
    lens: (0, pg_core_1.varchar)('lens', { length: 100 }), // Lens specification (e.g., 2.8-12mm)
    fieldOfView: (0, pg_core_1.varchar)('field_of_view', { length: 50 }), // Degrees (e.g., 120°)
    videoCodec: (0, pg_core_1.varchar)('video_codec', { length: 50 }), // H.264, H.265, etc.
    frameRate: (0, pg_core_1.varchar)('frame_rate', { length: 50 }), // fps (e.g., 30fps)
    infraredRange: (0, pg_core_1.varchar)('infrared_range', { length: 100 }), // IR range in meters (e.g., 30m)
    waterproof: (0, pg_core_1.boolean)('waterproof').default(false), // IP rating if external
    powerSupply: (0, pg_core_1.varchar)('power_supply', { length: 50 }), // PoE, 12V DC, etc.
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }), // Camera IP address
    macAddress: (0, pg_core_1.varchar)('mac_address', { length: 17 }), // MAC address
    nvrIntegration: (0, pg_core_1.varchar)('nvr_integration', { length: 255 }), // Connected NVR device
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

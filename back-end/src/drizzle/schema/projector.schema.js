"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectors = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.projectors = (0, pg_core_1.pgTable)('projectors', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    projectorType: (0, pg_core_1.varchar)('projector_type', { length: 50 }).notNull(), // Interactive or Long Throw
    lightSource: (0, pg_core_1.varchar)('light_source', { length: 50 }), // LED, Laser, Lamp, etc.
    brightness: (0, pg_core_1.varchar)('brightness', { length: 100 }), // ANSI lumens (e.g., 5000 lumens)
    contrast: (0, pg_core_1.varchar)('contrast', { length: 50 }), // Contrast ratio (e.g., 20000:1)
    resolution: (0, pg_core_1.varchar)('resolution', { length: 50 }), // Native resolution (e.g., 1920x1080, 4096x2160)
    throwRatio: (0, pg_core_1.varchar)('throw_ratio', { length: 50 }), // Throw ratio for positioning
    lensType: (0, pg_core_1.varchar)('lens_type', { length: 50 }), // Fixed, Zoom, etc.
    displayTechnology: (0, pg_core_1.varchar)('display_technology', { length: 50 }), // DLP, LCD, 3LCD, LCoS
    lampHours: (0, pg_core_1.integer)('lamp_hours'), // Lamp lifetime hours used
    maxLampHours: (0, pg_core_1.integer)('max_lamp_hours'), // Lamp maximum hours
    hasInteractivity: (0, pg_core_1.boolean)('has_interactivity').default(false), // Touch interaction capability
    connectivityPorts: (0, pg_core_1.varchar)('connectivity_ports', { length: 255 }), // Available ports (e.g., HDMI, VGA, USB)
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }), // Network IP for control
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

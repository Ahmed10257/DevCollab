"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.racks = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.racks = (0, pg_core_1.pgTable)('racks', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    rackType: (0, pg_core_1.varchar)('rack_type', { length: 50 }).notNull(), // Server Rack or Network Rack
    rackHeight: (0, pg_core_1.varchar)('rack_height', { length: 50 }).notNull(), // Height in U units (e.g., 42U, 48U)
    rackWidth: (0, pg_core_1.varchar)('rack_width', { length: 50 }), // Width specification (e.g., 19 inch, 21 inch)
    rackDepth: (0, pg_core_1.varchar)('rack_depth', { length: 50 }), // Depth in mm (e.g., 800mm, 1000mm)
    maxLoadCapacity: (0, pg_core_1.varchar)('max_load_capacity', { length: 100 }), // Weight capacity (e.g., 1000kg)
    currentLoadCapacity: (0, pg_core_1.varchar)('current_load_capacity', { length: 100 }), // Current utilization
    powerDistributionUnits: (0, pg_core_1.integer)('power_distribution_units'), // Number of PDUs
    coolingCapacity: (0, pg_core_1.varchar)('cooling_capacity', { length: 100 }), // BTU/hour or kW
    numberOfVerticalRails: (0, pg_core_1.integer)('number_of_vertical_rails'), // Number of mounting rails
    hasCaster: (0, pg_core_1.boolean)('has_caster').default(false), // Whether it has wheels
    color: (0, pg_core_1.varchar)('color', { length: 50 }), // Rack color (e.g., Black, Grey)
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

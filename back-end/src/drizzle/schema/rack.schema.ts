import {
pgTable,
serial,
integer,
varchar,
timestamp,
boolean,
decimal,
} from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const racks = pgTable('racks', {
id: serial('id').primaryKey(),
assetId: integer('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
rackType: varchar('rack_type', { length: 50 }).notNull(), // Server Rack or Network Rack
rackHeight: varchar('rack_height', { length: 50 }).notNull(), // Height in U units (e.g., 42U, 48U)
rackWidth: varchar('rack_width', { length: 50 }), // Width specification (e.g., 19 inch, 21 inch)
rackDepth: varchar('rack_depth', { length: 50 }), // Depth in mm (e.g., 800mm, 1000mm)
maxLoadCapacity: varchar('max_load_capacity', { length: 100 }), // Weight capacity (e.g., 1000kg)
currentLoadCapacity: varchar('current_load_capacity', { length: 100 }), // Current utilization
powerDistributionUnits: integer('power_distribution_units'), // Number of PDUs
coolingCapacity: varchar('cooling_capacity', { length: 100 }), // BTU/hour or kW
numberOfVerticalRails: integer('number_of_vertical_rails'), // Number of mounting rails
hasCaster: boolean('has_caster').default(false), // Whether it has wheels
color: varchar('color', { length: 50 }), // Rack color (e.g., Black, Grey)
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Rack = typeof racks.$inferSelect;
export type NewRack = typeof racks.$inferInsert;

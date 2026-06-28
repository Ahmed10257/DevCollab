import {
mysqlTable,
int,
int,
varchar,
timestamp,
boolean,
decimal,
} from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const racks = mysqlTable('racks', {
id: int('id').autoincrement().primaryKey(),
assetId: int('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
rackType: varchar('rack_type', { length: 50 }).notNull(),
rackHeight: varchar('rack_height', { length: 50 }).notNull(),
rackWidth: varchar('rack_width', { length: 50 }),
rackDepth: varchar('rack_depth', { length: 50 }),
maxLoadCapacity: varchar('max_load_capacity', { length: 100 }),
currentLoadCapacity: varchar('current_load_capacity', { length: 100 }),
powerDistributionUnits: int('power_distribution_units'),
coolingCapacity: varchar('cooling_capacity', { length: 100 }),
numberOfVerticalRails: int('number_of_vertical_rails'),
hasCaster: boolean('has_caster').default(false),
color: varchar('color', { length: 50 }),
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Rack = typeof racks.$inferSelect;
export type NewRack = typeof racks.$inferInsert;

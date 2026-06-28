import {
mysqlTable,
int,
int,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const projectors = mysqlTable('projectors', {
id: int('id').autoincrement().primaryKey(),
assetId: int('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
projectorType: varchar('projector_type', { length: 50 }).notNull(),
lightSource: varchar('light_source', { length: 50 }),
brightness: varchar('brightness', { length: 100 }),
contrast: varchar('contrast', { length: 50 }),
resolution: varchar('resolution', { length: 50 }),
throwRatio: varchar('throw_ratio', { length: 50 }),
lensType: varchar('lens_type', { length: 50 }),
displayTechnology: varchar('display_technology', { length: 50 }),
lampHours: int('lamp_hours'),
maxLampHours: int('max_lamp_hours'),
hasInteractivity: boolean('has_interactivity').default(false),
connectivityPorts: varchar('connectivity_ports', { length: 255 }),
ipAddress: varchar('ip_address', { length: 45 }),
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Projector = typeof projectors.$inferSelect;
export type NewProjector = typeof projectors.$inferInsert;

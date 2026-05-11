import {
pgTable,
serial,
integer,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const projectors = pgTable('projectors', {
id: serial('id').primaryKey(),
assetId: integer('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
projectorType: varchar('projector_type', { length: 50 }).notNull(), // Interactive or Long Throw
lightSource: varchar('light_source', { length: 50 }), // LED, Laser, Lamp, etc.
brightness: varchar('brightness', { length: 100 }), // ANSI lumens (e.g., 5000 lumens)
contrast: varchar('contrast', { length: 50 }), // Contrast ratio (e.g., 20000:1)
resolution: varchar('resolution', { length: 50 }), // Native resolution (e.g., 1920x1080, 4096x2160)
throwRatio: varchar('throw_ratio', { length: 50 }), // Throw ratio for positioning
lensType: varchar('lens_type', { length: 50 }), // Fixed, Zoom, etc.
displayTechnology: varchar('display_technology', { length: 50 }), // DLP, LCD, 3LCD, LCoS
lampHours: integer('lamp_hours'), // Lamp lifetime hours used
maxLampHours: integer('max_lamp_hours'), // Lamp maximum hours
hasInteractivity: boolean('has_interactivity').default(false), // Touch interaction capability
connectivityPorts: varchar('connectivity_ports', { length: 255 }), // Available ports (e.g., HDMI, VGA, USB)
ipAddress: varchar('ip_address', { length: 45 }), // Network IP for control
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Projector = typeof projectors.$inferSelect;
export type NewProjector = typeof projectors.$inferInsert;

import {
pgTable,
serial,
integer,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const cameras = pgTable('cameras', {
id: serial('id').primaryKey(),
assetId: integer('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
cameraType: varchar('camera_type', { length: 50 }).notNull(), // Internal or External
cameraStyle: varchar('camera_style', { length: 50 }), // Dome, Bullet, Turret, etc.
megapixels: varchar('megapixels', { length: 50 }), // Camera resolution (e.g., 4MP, 8MP)
sensor: varchar('sensor', { length: 50 }), // CMOS or CCD
lens: varchar('lens', { length: 100 }), // Lens specification (e.g., 2.8-12mm)
fieldOfView: varchar('field_of_view', { length: 50 }), // Degrees (e.g., 120°)
videoCodec: varchar('video_codec', { length: 50 }), // H.264, H.265, etc.
frameRate: varchar('frame_rate', { length: 50 }), // fps (e.g., 30fps)
infraredRange: varchar('infrared_range', { length: 100 }), // IR range in meters (e.g., 30m)
waterproof: boolean('waterproof').default(false), // IP rating if external
powerSupply: varchar('power_supply', { length: 50 }), // PoE, 12V DC, etc.
ipAddress: varchar('ip_address', { length: 45 }), // Camera IP address
macAddress: varchar('mac_address', { length: 17 }), // MAC address
nvrIntegration: varchar('nvr_integration', { length: 255 }), // Connected NVR device
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Camera = typeof cameras.$inferSelect;
export type NewCamera = typeof cameras.$inferInsert;

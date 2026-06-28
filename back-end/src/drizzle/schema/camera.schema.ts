import {
mysqlTable,
int,
int,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const cameras = mysqlTable('cameras', {
id: int('id').autoincrement().primaryKey(),
assetId: int('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
cameraType: varchar('camera_type', { length: 50 }).notNull(),
cameraStyle: varchar('camera_style', { length: 50 }),
megapixels: varchar('megapixels', { length: 50 }),
sensor: varchar('sensor', { length: 50 }),
lens: varchar('lens', { length: 100 }),
fieldOfView: varchar('field_of_view', { length: 50 }),
videoCodec: varchar('video_codec', { length: 50 }),
frameRate: varchar('frame_rate', { length: 50 }),
infraredRange: varchar('infrared_range', { length: 100 }),
waterproof: boolean('waterproof').default(false),
powerSupply: varchar('power_supply', { length: 50 }),
ipAddress: varchar('ip_address', { length: 45 }),
macAddress: varchar('mac_address', { length: 17 }),
nvrIntegration: varchar('nvr_integration', { length: 255 }),
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Camera = typeof cameras.$inferSelect;
export type NewCamera = typeof cameras.$inferInsert;

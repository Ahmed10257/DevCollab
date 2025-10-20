import {
pgTable,
serial,
integer,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const ipPhones = pgTable('ip_phones', {
id: serial('id').primaryKey(),
assetId: integer('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
phoneType: varchar('phone_type', { length: 50 }).notNull(), // Desk Phone or Conference Phone
phoneSystem: varchar('phone_system', { length: 100 }), // Cisco, Avaya, Polycom, etc.
lines: integer('lines'), // Number of supported phone lines
displayType: varchar('display_type', { length: 100 }), // Monochrome, Color, Size
screenSize: varchar('screen_size', { length: 50 }), // Screen resolution/size
speakers: integer('speakers'), // Number of built-in speakers
microphones: integer('microphones'), // Number of built-in microphones
hasVideoSupport: boolean('has_video_support').default(false), // Video calling capability
codec: varchar('codec', { length: 255 }), // Supported codecs (e.g., G.711, G.729)
powerSupply: varchar('power_supply', { length: 50 }), // PoE or AC adapter
ipAddress: varchar('ip_address', { length: 45 }), // Phone IP address
extensionNumber: varchar('extension_number', { length: 50 }), // Assigned phone extension
registrationStatus: varchar('registration_status', { length: 50 }), // Registered, Unregistered, etc.
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type IpPhone = typeof ipPhones.$inferSelect;
export type NewIpPhone = typeof ipPhones.$inferInsert;

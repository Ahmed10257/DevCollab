import {
mysqlTable,
int,
int,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const ipPhones = mysqlTable('ip_phones', {
id: int('id').autoincrement().primaryKey(),
assetId: int('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
phoneType: varchar('phone_type', { length: 50 }).notNull(),
phoneSystem: varchar('phone_system', { length: 100 }),
lines: int('lines'),
displayType: varchar('display_type', { length: 100 }),
screenSize: varchar('screen_size', { length: 50 }),
speakers: int('speakers'),
microphones: int('microphones'),
hasVideoSupport: boolean('has_video_support').default(false),
codec: varchar('codec', { length: 255 }),
powerSupply: varchar('power_supply', { length: 50 }),
ipAddress: varchar('ip_address', { length: 45 }),
extensionNumber: varchar('extension_number', { length: 50 }),
registrationStatus: varchar('registration_status', { length: 50 }),
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type IpPhone = typeof ipPhones.$inferSelect;
export type NewIpPhone = typeof ipPhones.$inferInsert;

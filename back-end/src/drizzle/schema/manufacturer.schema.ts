import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const manufacturers = mysqlTable('manufacturers', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description'),
  website: varchar('website', { length: 255 }),
  supportEmail: varchar('support_email', { length: 255 }),
  supportPhone: varchar('support_phone', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Manufacturer = typeof manufacturers.$inferSelect;
export type NewManufacturer = typeof manufacturers.$inferInsert;

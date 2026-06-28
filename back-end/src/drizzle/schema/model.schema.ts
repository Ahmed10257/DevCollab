import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  int,
} from 'drizzle-orm/mysql-core';
import { manufacturers } from './manufacturer.schema';

export const models = mysqlTable('models', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  manufacturerId: int('manufacturer_id')
    .notNull()
    .references(() => manufacturers.id, { onDelete: 'cascade' }),
  modelNumber: varchar('model_number', { length: 100 }),
  description: text('description'),
  specifications: text('specifications'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Model = typeof models.$inferSelect;
export type NewModel = typeof models.$inferInsert;

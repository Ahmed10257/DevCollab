import { pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { categories } from './category.schema';

export const types = pgTable('types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Type = typeof types.$inferSelect;
export type NewType = typeof types.$inferInsert;

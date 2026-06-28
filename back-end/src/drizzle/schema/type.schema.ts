import { mysqlTable, int, varchar, timestamp, int } from 'drizzle-orm/mysql-core';
import { categories } from './category.schema';

export const types = mysqlTable('types', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  categoryId: int('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Type = typeof types.$inferSelect;
export type NewType = typeof types.$inferInsert;

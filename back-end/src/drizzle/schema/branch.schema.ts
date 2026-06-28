import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { buildings } from './building.schema';

export const branches = mysqlTable('branches', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const branchesRelations = relations(branches, ({ many }) => ({
    buildings: many(buildings),
}));

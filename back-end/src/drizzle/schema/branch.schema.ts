import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { buildings } from './building.schema';

export const branches = pgTable('branches', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    name: varchar('name', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const branchesRelations = relations(branches, ({ many }) => ({
    buildings: many(buildings),
}));

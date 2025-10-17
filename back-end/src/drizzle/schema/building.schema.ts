import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { branches } from './branch.schema';
import { floors } from './floor.schema';

export const buildings = pgTable('buildings', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    name: varchar('name', { length: 100 }).notNull(),
    branchId: integer('branch_id').notNull().references(() => branches.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const buildingsRelations = relations(buildings, ({ one, many }) => ({
    branch: one(branches, {
        fields: [buildings.branchId],
        references: [branches.id],
    }),
    floors: many(floors),
}));

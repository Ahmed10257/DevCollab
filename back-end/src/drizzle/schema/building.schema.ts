import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { branches } from './branch.schema';
import { floors } from './floor.schema';

export const buildings = mysqlTable('buildings', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    branchId: int('branch_id').notNull().references(() => branches.id, { onDelete: 'cascade' }),
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

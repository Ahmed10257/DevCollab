import { pgTable, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const teams = pgTable('teams', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 100 }).notNull(),
    leaderId: integer('leader_id'),
    createdAt: timestamp('created_at').defaultNow(),
});
import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';

export const teams = mysqlTable('teams', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    leaderId: int('leader_id'),
    createdAt: timestamp('created_at').defaultNow(),
});

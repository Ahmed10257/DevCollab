import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const priority = mysqlTable('priority', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

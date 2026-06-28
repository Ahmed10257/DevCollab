import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const status = mysqlTable('status', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

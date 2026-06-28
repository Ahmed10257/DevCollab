import { mysqlTable, varchar, int, text, timestamp } from 'drizzle-orm/mysql-core';
import { users } from './user.schema';
import { priority } from './priority.schema';
import { status } from './status.schema';

export const tasks = mysqlTable('tasks', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    createdBy: int('created_by').notNull().references(() => users.id),
    assignedTo: int('assigned_to').references(() => users.id),
    taskPriority: int('task_priority').default(2).references(() => priority.id),
    taskStatus: int('task_status').default(3).references(() => status.id),
    createdAt: timestamp('created_at').defaultNow(),
    assignedAt: timestamp('assigned_at'),
    deadline: timestamp('deadline'),
});

import { pgTable, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { teams } from './team.schema';
import { users } from './user.schema';
import { priority } from './priority.schema';
import { status } from './status.schema';

export const tasks = pgTable('tasks', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    createdBy: integer('created_by').notNull().references(() => users.id),
    assignedTo: integer('assigned_to').references(() => users.id),
    taskPriority: integer('task_priority').default(2).references(() => priority.id),
    taskStatus: integer('task_status').default(3).references(() => status.id),
    createdAt: timestamp('created_at').defaultNow(),
    assignedAt: timestamp('assigned_at'),
    deadline: timestamp('deadline'),
});
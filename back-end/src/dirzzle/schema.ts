import { pgTable, serial, varchar, timestamp, boolean, text, integer, pgEnum } from 'drizzle-orm/pg-core';

// Optional enums
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);
export const statusEnum = pgEnum('status', ['todo', 'in_progress', 'done']);

export const teams = pgTable('teams', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 100 }).notNull(),
  leaderId: integer('leader_id').notNull(), // FK to users.id
  createdAt: timestamp('created_at').defaultNow(),
});

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  refreshToken: varchar('refresh_token', { length: 255 }),
  isVerified: boolean('is_verified').default(false),
  isLeader: boolean('is_leader').default(false),
  teamId: integer('team_id').references(() => teams.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  teamId: integer('team_id').notNull().references(() => teams.id),
  createdBy: integer('created_by').notNull().references(() => users.id),
  assignedTo: integer('assigned_to').notNull().references(() => users.id),
  priority: priorityEnum('priority').default('medium'),
  status: statusEnum('status').default('todo'),
  createdAt: timestamp('created_at').defaultNow(),
  assignedAt: timestamp('assigned_at'),
  deadline: timestamp('deadline'),
});

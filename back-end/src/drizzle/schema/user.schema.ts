import { pgTable, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { teams } from './team.schema';

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
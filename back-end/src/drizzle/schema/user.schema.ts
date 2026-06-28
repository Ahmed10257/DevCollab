import { mysqlTable, varchar, int, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { teams } from './team.schema';

export const users = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    username: varchar('username', { length: 100 }).unique(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 255 }),
    role: varchar('role', { length: 20 }).notNull().default('user'),
    refreshToken: varchar('refresh_token', { length: 255 }),
    isVerified: boolean('is_verified').default(false),
    isLeader: boolean('is_leader').default(false),
    teamId: int('team_id').references(() => teams.id),
    createdAt: timestamp('created_at').defaultNow(),
});

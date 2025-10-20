"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var team_schema_1 = require("./team.schema");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull().unique(),
    password: (0, pg_core_1.varchar)('password', { length: 255 }).notNull(),
    refreshToken: (0, pg_core_1.varchar)('refresh_token', { length: 255 }),
    isVerified: (0, pg_core_1.boolean)('is_verified').default(false),
    isLeader: (0, pg_core_1.boolean)('is_leader').default(false),
    teamId: (0, pg_core_1.integer)('team_id').references(function () { return team_schema_1.teams.id; }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});

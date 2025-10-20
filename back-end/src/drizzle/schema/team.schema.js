"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.teams = (0, pg_core_1.pgTable)('teams', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    leaderId: (0, pg_core_1.integer)('leader_id'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});

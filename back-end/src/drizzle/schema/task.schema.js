"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var user_schema_1 = require("./user.schema");
var priority_schema_1 = require("./priority.schema");
var status_schema_1 = require("./status.schema");
exports.tasks = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    createdBy: (0, pg_core_1.integer)('created_by').notNull().references(function () { return user_schema_1.users.id; }),
    assignedTo: (0, pg_core_1.integer)('assigned_to').references(function () { return user_schema_1.users.id; }),
    taskPriority: (0, pg_core_1.integer)('task_priority').default(2).references(function () { return priority_schema_1.priority.id; }),
    taskStatus: (0, pg_core_1.integer)('task_status').default(3).references(function () { return status_schema_1.status.id; }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    assignedAt: (0, pg_core_1.timestamp)('assigned_at'),
    deadline: (0, pg_core_1.timestamp)('deadline'),
});

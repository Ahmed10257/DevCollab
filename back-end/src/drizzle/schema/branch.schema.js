"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchesRelations = exports.branches = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
var building_schema_1 = require("./building.schema");
exports.branches = (0, pg_core_1.pgTable)('branches', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.branchesRelations = (0, drizzle_orm_1.relations)(exports.branches, function (_a) {
    var many = _a.many;
    return ({
        buildings: many(building_schema_1.buildings),
    });
});

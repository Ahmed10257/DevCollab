"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingsRelations = exports.buildings = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
var branch_schema_1 = require("./branch.schema");
var floor_schema_1 = require("./floor.schema");
exports.buildings = (0, pg_core_1.pgTable)('buildings', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    branchId: (0, pg_core_1.integer)('branch_id').notNull().references(function () { return branch_schema_1.branches.id; }, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.buildingsRelations = (0, drizzle_orm_1.relations)(exports.buildings, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        branch: one(branch_schema_1.branches, {
            fields: [exports.buildings.branchId],
            references: [branch_schema_1.branches.id],
        }),
        floors: many(floor_schema_1.floors),
    });
});

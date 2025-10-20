"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floorsRelations = exports.floors = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
var building_schema_1 = require("./building.schema");
var room_schema_1 = require("./room.schema");
exports.floors = (0, pg_core_1.pgTable)('floors', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    buildingId: (0, pg_core_1.integer)('building_id').notNull().references(function () { return building_schema_1.buildings.id; }, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.floorsRelations = (0, drizzle_orm_1.relations)(exports.floors, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        building: one(building_schema_1.buildings, {
            fields: [exports.floors.buildingId],
            references: [building_schema_1.buildings.id],
        }),
        rooms: many(room_schema_1.rooms),
    });
});

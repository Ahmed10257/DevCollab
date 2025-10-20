"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsRelations = exports.rooms = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
var floor_schema_1 = require("./floor.schema");
exports.rooms = (0, pg_core_1.pgTable)('rooms', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    floorId: (0, pg_core_1.integer)('floor_id').notNull().references(function () { return floor_schema_1.floors.id; }, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.roomsRelations = (0, drizzle_orm_1.relations)(exports.rooms, function (_a) {
    var one = _a.one;
    return ({
        floor: one(floor_schema_1.floors, {
            fields: [exports.rooms.floorId],
            references: [floor_schema_1.floors.id],
        }),
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assets = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var category_schema_1 = require("./category.schema");
var type_schema_1 = require("./type.schema");
var manufacturer_schema_1 = require("./manufacturer.schema");
var model_schema_1 = require("./model.schema");
var branch_schema_1 = require("./branch.schema");
var building_schema_1 = require("./building.schema");
var floor_schema_1 = require("./floor.schema");
var room_schema_1 = require("./room.schema");
var user_schema_1 = require("./user.schema");
exports.assets = (0, pg_core_1.pgTable)('assets', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    categoryId: (0, pg_core_1.integer)('category_id')
        .notNull()
        .references(function () { return category_schema_1.categories.id; }, { onDelete: 'restrict' }),
    typeId: (0, pg_core_1.integer)('type_id')
        .notNull()
        .references(function () { return type_schema_1.types.id; }, { onDelete: 'restrict' }),
    serialNumber: (0, pg_core_1.varchar)('serial_number', { length: 255 }).notNull().unique(),
    manufacturerId: (0, pg_core_1.integer)('manufacturer_id')
        .references(function () { return manufacturer_schema_1.manufacturers.id; }, { onDelete: 'set null' }),
    modelId: (0, pg_core_1.integer)('model_id')
        .references(function () { return model_schema_1.models.id; }, { onDelete: 'set null' }),
    // Location hierarchy - all optional for flexibility
    branchId: (0, pg_core_1.integer)('branch_id')
        .references(function () { return branch_schema_1.branches.id; }, { onDelete: 'set null' }),
    buildingId: (0, pg_core_1.integer)('building_id')
        .references(function () { return building_schema_1.buildings.id; }, { onDelete: 'set null' }),
    floorId: (0, pg_core_1.integer)('floor_id')
        .references(function () { return floor_schema_1.floors.id; }, { onDelete: 'set null' }),
    roomId: (0, pg_core_1.integer)('room_id')
        .references(function () { return room_schema_1.rooms.id; }, { onDelete: 'set null' }),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).notNull().default('Available'), // Available, In Use, Under Maintenance, Retired
    purchaseDate: (0, pg_core_1.date)('purchase_date'),
    warrantyExpiry: (0, pg_core_1.date)('warranty_expiry'),
    responsibleUserId: (0, pg_core_1.integer)('responsible_user_id')
        .references(function () { return user_schema_1.users.id; }, { onDelete: 'set null' }),
    assignedUserId: (0, pg_core_1.integer)('assigned_user_id')
        .references(function () { return user_schema_1.users.id; }, { onDelete: 'set null' }),
    notes: (0, pg_core_1.varchar)('notes', { length: 1000 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

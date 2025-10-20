"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var manufacturer_schema_1 = require("./manufacturer.schema");
exports.models = (0, pg_core_1.pgTable)('models', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    manufacturerId: (0, pg_core_1.integer)('manufacturer_id')
        .notNull()
        .references(function () { return manufacturer_schema_1.manufacturers.id; }, { onDelete: 'cascade' }),
    modelNumber: (0, pg_core_1.varchar)('model_number', { length: 100 }),
    description: (0, pg_core_1.text)('description'),
    specifications: (0, pg_core_1.text)('specifications'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

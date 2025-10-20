"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var category_schema_1 = require("./category.schema");
exports.types = (0, pg_core_1.pgTable)('types', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    categoryId: (0, pg_core_1.integer)('category_id')
        .notNull()
        .references(function () { return category_schema_1.categories.id; }, { onDelete: 'cascade' }),
    description: (0, pg_core_1.varchar)('description', { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

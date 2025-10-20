"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturers = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.manufacturers = (0, pg_core_1.pgTable)('manufacturers', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull().unique(),
    description: (0, pg_core_1.text)('description'),
    website: (0, pg_core_1.varchar)('website', { length: 255 }),
    supportEmail: (0, pg_core_1.varchar)('support_email', { length: 255 }),
    supportPhone: (0, pg_core_1.varchar)('support_phone', { length: 50 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

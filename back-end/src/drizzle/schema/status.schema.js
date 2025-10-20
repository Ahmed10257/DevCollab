"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.status = (0, pg_core_1.pgTable)('status', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
require("dotenv/config");
const isDev = process.env.NODE_ENV === 'development';
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: isDev ? './src/drizzle/schema/**.ts' : './dist/drizzle/schema/**.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || 'default_database_url',
    },
});
//# sourceMappingURL=drizzle.config.js.map
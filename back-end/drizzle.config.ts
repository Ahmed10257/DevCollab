import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
// This file is used to configure drizzle-kit for generating the database schema
// and types. It is not used in the production code.

export default defineConfig({
    schema: './src/dirzzle/schema/**.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || 'default_database_url',
    },
});

import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
// This file is used to configure drizzle-kit for generating the database schema
// and types. It is not used in the production code.

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
    schema: isDev ? './src/drizzle/schema/**.ts' : './dist/drizzle/schema/**.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || 'default_database_url',
    },
});

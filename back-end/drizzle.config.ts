import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
    schema: isDev ? './src/drizzle/schema/**.ts' : './dist/drizzle/schema/**.js',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/devcollab',
    },
});

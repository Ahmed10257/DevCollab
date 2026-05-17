import 'dotenv/config';
import pg from 'pg';

const sql = [
    'ALTER TABLE users ADD COLUMN IF NOT EXISTS username varchar(100)',
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS role varchar(20) DEFAULT 'user' NOT NULL",
    'ALTER TABLE users ALTER COLUMN password DROP NOT NULL',
    'CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique ON users (username)',
];

async function main() {
    const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    for (const statement of sql) {
        await client.query(statement);
        console.log('OK:', statement);
    }

    await client.end();
    console.log('Migration 0009_ad_user_fields applied.');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

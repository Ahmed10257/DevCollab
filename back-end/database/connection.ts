import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../src/drizzle/schema/schema';
import type { DrizzleDB } from '../src/drizzle/types/drizzle';

export type SeedContext = {
  db: DrizzleDB;
  schema: typeof schema;
};

export async function withDatabase<T>(fn: (ctx: SeedContext) => Promise<T>): Promise<T> {
  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL!,
  });
  const db = drizzle(pool, { schema, mode: 'default' });

  try {
    return await fn({ db, schema });
  } finally {
    await pool.end();
  }
}

import { eq, inArray, SQL } from 'drizzle-orm';
import { AnyMySqlTable } from 'drizzle-orm/mysql-core';
import { DrizzleDB } from '../types/drizzle';

type RowWithId = { id: number };

export async function insertReturning<T extends RowWithId>(
  db: DrizzleDB,
  table: AnyMySqlTable,
  values: Record<string, unknown> | Record<string, unknown>[],
): Promise<T[]> {
  const rows = Array.isArray(values) ? values : [values];
  const ids = await db.insert(table).values(rows).$returningId();
  const idList = ids.map((row) => row.id);
  if (idList.length === 0) {
    return [];
  }
  return db.select().from(table).where(inArray(table.id, idList)) as Promise<T[]>;
}

export async function updateReturning<T extends RowWithId>(
  db: DrizzleDB,
  table: AnyMySqlTable,
  where: SQL,
  values: Record<string, unknown>,
): Promise<T[]> {
  await db.update(table).set(values).where(where);
  return db.select().from(table).where(where) as Promise<T[]>;
}

export async function deleteReturning<T extends RowWithId>(
  db: DrizzleDB,
  table: AnyMySqlTable,
  where: SQL,
): Promise<T[]> {
  const rows = (await db.select().from(table).where(where)) as T[];
  if (rows.length === 0) {
    return [];
  }
  await db.delete(table).where(where);
  return rows;
}

export async function deleteReturningById<T extends RowWithId>(
  db: DrizzleDB,
  table: AnyMySqlTable,
  id: number,
): Promise<T[]> {
  return deleteReturning<T>(db, table, eq(table.id, id));
}

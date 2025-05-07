import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../dirzzle/schema';

export type DrizzleDB = NodePgDatabase<typeof schema>;

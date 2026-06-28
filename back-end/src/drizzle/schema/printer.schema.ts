import {
mysqlTable,
int,
int,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/mysql-core';
import { assets } from './asset.schema';

export const printers = mysqlTable('printers', {
id: int('id').autoincrement().primaryKey(),
assetId: int('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
printerType: varchar('printer_type', { length: 50 }).notNull(),
printTechnology: varchar('print_technology', { length: 50 }),
colorCapability: varchar('color_capability', { length: 50 }),
maxPrintSpeed: varchar('max_print_speed', { length: 50 }),
resolution: varchar('resolution', { length: 50 }),
paperSize: varchar('paper_size', { length: 100 }),
maxPaperCapacity: varchar('max_paper_capacity', { length: 50 }),
tonerCartridgeModel: varchar('toner_cartridge_model', { length: 255 }),
networked: boolean('networked').default(false),
ipAddress: varchar('ip_address', { length: 45 }),
macAddress: varchar('mac_address', { length: 17 }),
currentTonerLevel: varchar('current_toner_level', { length: 50 }),
totalPagesPrinted: int('total_pages_printed'),
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Printer = typeof printers.$inferSelect;
export type NewPrinter = typeof printers.$inferInsert;

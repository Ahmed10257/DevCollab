import {
pgTable,
serial,
integer,
varchar,
timestamp,
boolean,
} from 'drizzle-orm/pg-core';
import { assets } from './asset.schema';

export const printers = pgTable('printers', {
id: serial('id').primaryKey(),
assetId: integer('asset_id')
.notNull()
.unique()
.references(() => assets.id, { onDelete: 'cascade' }),
printerType: varchar('printer_type', { length: 50 }).notNull(), // Printer, Scanner, Copier
printTechnology: varchar('print_technology', { length: 50 }), // Inkjet, Laser, Thermal, etc.
colorCapability: varchar('color_capability', { length: 50 }), // B&W or Color
maxPrintSpeed: varchar('max_print_speed', { length: 50 }), // Pages per minute (e.g., 40ppm)
resolution: varchar('resolution', { length: 50 }), // DPI (e.g., 1200x1200)
paperSize: varchar('paper_size', { length: 100 }), // Supported sizes (e.g., A4, A3, Legal)
maxPaperCapacity: varchar('max_paper_capacity', { length: 50 }), // Sheet count (e.g., 500)
tonerCartridgeModel: varchar('toner_cartridge_model', { length: 255 }), // Compatible cartridge model
networked: boolean('networked').default(false), // Has network connectivity
ipAddress: varchar('ip_address', { length: 45 }), // Network IP if networked
macAddress: varchar('mac_address', { length: 17 }), // Network MAC address
currentTonerLevel: varchar('current_toner_level', { length: 50 }), // Toner percentage or status
totalPagesPrinted: integer('total_pages_printed'), // Lifetime page count
createdAt: timestamp('created_at').defaultNow().notNull(),
updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Printer = typeof printers.$inferSelect;
export type NewPrinter = typeof printers.$inferInsert;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printers = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var asset_schema_1 = require("./asset.schema");
exports.printers = (0, pg_core_1.pgTable)('printers', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    assetId: (0, pg_core_1.integer)('asset_id')
        .notNull()
        .unique()
        .references(function () { return asset_schema_1.assets.id; }, { onDelete: 'cascade' }),
    printerType: (0, pg_core_1.varchar)('printer_type', { length: 50 }).notNull(), // Printer, Scanner, Copier
    printTechnology: (0, pg_core_1.varchar)('print_technology', { length: 50 }), // Inkjet, Laser, Thermal, etc.
    colorCapability: (0, pg_core_1.varchar)('color_capability', { length: 50 }), // B&W or Color
    maxPrintSpeed: (0, pg_core_1.varchar)('max_print_speed', { length: 50 }), // Pages per minute (e.g., 40ppm)
    resolution: (0, pg_core_1.varchar)('resolution', { length: 50 }), // DPI (e.g., 1200x1200)
    paperSize: (0, pg_core_1.varchar)('paper_size', { length: 100 }), // Supported sizes (e.g., A4, A3, Legal)
    maxPaperCapacity: (0, pg_core_1.varchar)('max_paper_capacity', { length: 50 }), // Sheet count (e.g., 500)
    tonerCartridgeModel: (0, pg_core_1.varchar)('toner_cartridge_model', { length: 255 }), // Compatible cartridge model
    networked: (0, pg_core_1.boolean)('networked').default(false), // Has network connectivity
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }), // Network IP if networked
    macAddress: (0, pg_core_1.varchar)('mac_address', { length: 17 }), // Network MAC address
    currentTonerLevel: (0, pg_core_1.varchar)('current_toner_level', { length: 50 }), // Toner percentage or status
    totalPagesPrinted: (0, pg_core_1.integer)('total_pages_printed'), // Lifetime page count
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});

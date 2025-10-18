import { pgTable, serial, varchar, timestamp, integer, date } from 'drizzle-orm/pg-core';
import { categories } from './category.schema';
import { types } from './type.schema';
import { branches } from './branch.schema';
import { buildings } from './building.schema';
import { floors } from './floor.schema';
import { rooms } from './room.schema';
import { users } from './user.schema';

export const assets = pgTable('assets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),
  typeId: integer('type_id')
    .notNull()
    .references(() => types.id, { onDelete: 'restrict' }),
  serialNumber: varchar('serial_number', { length: 255 }).notNull().unique(),
  model: varchar('model', { length: 255 }),
  brand: varchar('brand', { length: 255 }),
  // Location hierarchy - all optional for flexibility
  branchId: integer('branch_id')
    .references(() => branches.id, { onDelete: 'set null' }),
  buildingId: integer('building_id')
    .references(() => buildings.id, { onDelete: 'set null' }),
  floorId: integer('floor_id')
    .references(() => floors.id, { onDelete: 'set null' }),
  roomId: integer('room_id')
    .references(() => rooms.id, { onDelete: 'set null' }),
  status: varchar('status', { length: 50 }).notNull().default('Available'), // Available, In Use, Under Maintenance, Retired
  purchaseDate: date('purchase_date'),
  warrantyExpiry: date('warranty_expiry'),
  responsibleUserId: integer('responsible_user_id')
    .references(() => users.id, { onDelete: 'set null' }),
  assignedUserId: integer('assigned_user_id')
    .references(() => users.id, { onDelete: 'set null' }),
  notes: varchar('notes', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;

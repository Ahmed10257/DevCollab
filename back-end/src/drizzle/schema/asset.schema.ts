import { mysqlTable, int, varchar, timestamp, int, date } from 'drizzle-orm/mysql-core';
import { categories } from './category.schema';
import { types } from './type.schema';
import { manufacturers } from './manufacturer.schema';
import { models } from './model.schema';
import { branches } from './branch.schema';
import { buildings } from './building.schema';
import { floors } from './floor.schema';
import { rooms } from './room.schema';
import { users } from './user.schema';

export const assets = mysqlTable('assets', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  categoryId: int('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),
  typeId: int('type_id')
    .notNull()
    .references(() => types.id, { onDelete: 'restrict' }),
  serialNumber: varchar('serial_number', { length: 255 }).notNull().unique(),
  manufacturerId: int('manufacturer_id')
    .references(() => manufacturers.id, { onDelete: 'set null' }),
  modelId: int('model_id')
    .references(() => models.id, { onDelete: 'set null' }),
  branchId: int('branch_id')
    .references(() => branches.id, { onDelete: 'set null' }),
  buildingId: int('building_id')
    .references(() => buildings.id, { onDelete: 'set null' }),
  floorId: int('floor_id')
    .references(() => floors.id, { onDelete: 'set null' }),
  roomId: int('room_id')
    .references(() => rooms.id, { onDelete: 'set null' }),
  status: varchar('status', { length: 50 }).notNull().default('Available'),
  purchaseDate: date('purchase_date'),
  warrantyExpiry: date('warranty_expiry'),
  responsibleUserId: int('responsible_user_id')
    .references(() => users.id, { onDelete: 'set null' }),
  assignedUserId: int('assigned_user_id')
    .references(() => users.id, { onDelete: 'set null' }),
  notes: varchar('notes', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;

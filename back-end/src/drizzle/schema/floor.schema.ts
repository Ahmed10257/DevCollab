import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { buildings } from './building.schema';
import { rooms } from './room.schema';

export const floors = mysqlTable('floors', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    buildingId: int('building_id').notNull().references(() => buildings.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const floorsRelations = relations(floors, ({ one, many }) => ({
    building: one(buildings, {
        fields: [floors.buildingId],
        references: [buildings.id],
    }),
    rooms: many(rooms),
}));

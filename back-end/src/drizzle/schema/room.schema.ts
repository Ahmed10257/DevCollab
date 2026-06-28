import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { floors } from './floor.schema';

export const rooms = mysqlTable('rooms', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    floorId: int('floor_id').notNull().references(() => floors.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const roomsRelations = relations(rooms, ({ one }) => ({
    floor: one(floors, {
        fields: [rooms.floorId],
        references: [floors.id],
    }),
}));

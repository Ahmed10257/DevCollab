import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { floors } from './floor.schema';

export const rooms = pgTable('rooms', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    name: varchar('name', { length: 100 }).notNull(),
    floorId: integer('floor_id').notNull().references(() => floors.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const roomsRelations = relations(rooms, ({ one }) => ({
    floor: one(floors, {
        fields: [rooms.floorId],
        references: [floors.id],
    }),
}));

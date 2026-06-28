import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { rooms } from '../drizzle/schema/room.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class RoomsRepository {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

    findAll() {
        return this.db.query.rooms.findMany({
            orderBy: (rooms, { asc }) => [asc(rooms.name)],
            with: {
                floor: true,
            },
        });
    }

    findByFloorId(floorId: number) {
        return this.db.query.rooms.findMany({
            where: eq(rooms.floorId, floorId),
            orderBy: (rooms, { asc }) => [asc(rooms.name)],
        });
    }

    findById(id: number) {
        return this.db.query.rooms.findFirst({
            where: eq(rooms.id, id),
            with: {
                floor: true,
            },
        });
    }

    create(name: string, floorId: number) {
        return insertReturning(this.db, rooms, { name, floorId });
    }

    update(id: number, name: string, floorId?: number) {
        const updateData: Record<string, unknown> = { name, updatedAt: new Date() };
        if (floorId !== undefined) {
            updateData.floorId = floorId;
        }
        return updateReturning(this.db, rooms, eq(rooms.id, id), updateData);
    }

    delete(id: number) {
        return deleteReturningById(this.db, rooms, id);
    }
}

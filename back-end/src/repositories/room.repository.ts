import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { rooms } from '../drizzle/schema/room.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';

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
        return this.db.insert(rooms).values({ name, floorId }).returning();
    }

    update(id: number, name: string, floorId?: number) {
        const updateData: any = { name, updatedAt: new Date() };
        if (floorId !== undefined) {
            updateData.floorId = floorId;
        }
        return this.db
            .update(rooms)
            .set(updateData)
            .where(eq(rooms.id, id))
            .returning();
    }

    delete(id: number) {
        return this.db.delete(rooms).where(eq(rooms.id, id)).returning();
    }
}

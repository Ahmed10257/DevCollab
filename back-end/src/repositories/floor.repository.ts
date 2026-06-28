import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { floors } from '../drizzle/schema/floor.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class FloorsRepository {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

    findAll() {
        return this.db.query.floors.findMany({
            orderBy: (floors, { asc }) => [asc(floors.name)],
            with: {
                building: true,
            },
        });
    }

    findByBuildingId(buildingId: number) {
        return this.db.query.floors.findMany({
            where: eq(floors.buildingId, buildingId),
            orderBy: (floors, { asc }) => [asc(floors.name)],
        });
    }

    findById(id: number) {
        return this.db.query.floors.findFirst({
            where: eq(floors.id, id),
            with: {
                building: true,
            },
        });
    }

    create(name: string, buildingId: number) {
        return insertReturning(this.db, floors, { name, buildingId });
    }

    update(id: number, name: string, buildingId?: number) {
        const updateData: Record<string, unknown> = { name, updatedAt: new Date() };
        if (buildingId !== undefined) {
            updateData.buildingId = buildingId;
        }
        return updateReturning(this.db, floors, eq(floors.id, id), updateData);
    }

    delete(id: number) {
        return deleteReturningById(this.db, floors, id);
    }
}

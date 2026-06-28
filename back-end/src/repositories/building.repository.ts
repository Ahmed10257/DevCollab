import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { buildings } from '../drizzle/schema/building.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class BuildingsRepository {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

    findAll() {
        return this.db.query.buildings.findMany({
            orderBy: (buildings, { asc }) => [asc(buildings.name)],
            with: {
                branch: true,
            },
        });
    }

    findByBranchId(branchId: number) {
        return this.db.query.buildings.findMany({
            where: eq(buildings.branchId, branchId),
            orderBy: (buildings, { asc }) => [asc(buildings.name)],
        });
    }

    findById(id: number) {
        return this.db.query.buildings.findFirst({
            where: eq(buildings.id, id),
            with: {
                branch: true,
            },
        });
    }

    create(name: string, branchId: number) {
        return insertReturning(this.db, buildings, { name, branchId });
    }

    update(id: number, name: string, branchId?: number) {
        const updateData: Record<string, unknown> = { name, updatedAt: new Date() };
        if (branchId !== undefined) {
            updateData.branchId = branchId;
        }
        return updateReturning(this.db, buildings, eq(buildings.id, id), updateData);
    }

    delete(id: number) {
        return deleteReturningById(this.db, buildings, id);
    }
}

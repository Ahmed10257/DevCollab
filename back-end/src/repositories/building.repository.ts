import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { buildings } from '../drizzle/schema/building.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';

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
        return this.db.insert(buildings).values({ name, branchId }).returning();
    }

    update(id: number, name: string, branchId?: number) {
        const updateData: any = { name, updatedAt: new Date() };
        if (branchId !== undefined) {
            updateData.branchId = branchId;
        }
        return this.db
            .update(buildings)
            .set(updateData)
            .where(eq(buildings.id, id))
            .returning();
    }

    delete(id: number) {
        return this.db.delete(buildings).where(eq(buildings.id, id)).returning();
    }
}

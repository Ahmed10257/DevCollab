import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { branches } from '../drizzle/schema/branch.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';

@Injectable()
export class BranchesRepository {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

    findAll() {
        return this.db.query.branches.findMany({
            orderBy: (branches, { asc }) => [asc(branches.name)],
        });
    }

    findById(id: number) {
        return this.db.query.branches.findFirst({
            where: eq(branches.id, id),
        });
    }

    create(name: string) {
        return this.db.insert(branches).values({ name }).returning();
    }

    update(id: number, name: string) {
        return this.db
            .update(branches)
            .set({ name, updatedAt: new Date() })
            .where(eq(branches.id, id))
            .returning();
    }

    delete(id: number) {
        return this.db.delete(branches).where(eq(branches.id, id)).returning();
    }
}

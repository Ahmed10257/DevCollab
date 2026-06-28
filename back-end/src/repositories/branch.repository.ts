import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { branches } from '../drizzle/schema/branch.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

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
        return insertReturning(this.db, branches, { name });
    }

    update(id: number, name: string) {
        return updateReturning(this.db, branches, eq(branches.id, id), {
            name,
            updatedAt: new Date(),
        });
    }

    delete(id: number) {
        return deleteReturningById(this.db, branches, id);
    }
}

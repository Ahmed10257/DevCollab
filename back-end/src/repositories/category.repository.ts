import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { categories } from '../drizzle/schema/category.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class CategoryRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll() {
    return await this.db.select().from(categories);
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return result[0];
  }

  async create(data: typeof categories.$inferInsert) {
    const result = await insertReturning(this.db, categories, data);
    return result[0];
  }

  async update(id: number, data: Partial<typeof categories.$inferInsert>) {
    const result = await updateReturning(this.db, categories, eq(categories.id, id), {
      ...data,
      updatedAt: new Date(),
    });
    return result[0];
  }

  async delete(id: number) {
    const result = await deleteReturningById(this.db, categories, id);
    return result[0];
  }
}

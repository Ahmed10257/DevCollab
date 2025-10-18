import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { categories } from '../drizzle/schema/category.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';

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
    const result = await this.db
      .insert(categories)
      .values(data)
      .returning();
    return result[0];
  }

  async update(id: number, data: Partial<typeof categories.$inferInsert>) {
    const result = await this.db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const result = await this.db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();
    return result[0];
  }
}

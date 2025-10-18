import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { types } from '../drizzle/schema/type.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';

@Injectable()
export class TypeRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll() {
    return await this.db.select().from(types);
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(types)
      .where(eq(types.id, id));
    return result[0];
  }

  async findByCategoryId(categoryId: number) {
    return await this.db
      .select()
      .from(types)
      .where(eq(types.categoryId, categoryId));
  }

  async create(data: typeof types.$inferInsert) {
    const result = await this.db
      .insert(types)
      .values(data)
      .returning();
    return result[0];
  }

  async update(id: number, data: Partial<typeof types.$inferInsert>) {
    const result = await this.db
      .update(types)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(types.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const result = await this.db
      .delete(types)
      .where(eq(types.id, id))
      .returning();
    return result[0];
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.module';
import * as schema from '../drizzle/schema/schema';
import { models, NewModel } from '../drizzle/schema/model.schema';

@Injectable()
export class ModelRepository {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(manufacturerId?: number) {
    if (manufacturerId) {
      return this.db
        .select()
        .from(models)
        .where(eq(models.manufacturerId, manufacturerId));
    }
    return this.db.select().from(models);
  }

  async findOne(id: number) {
    const result = await this.db
      .select()
      .from(models)
      .where(eq(models.id, id))
      .limit(1);
    return result[0] || null;
  }

  async create(data: NewModel) {
    const result = await this.db.insert(models).values(data).returning();
    return result[0];
  }

  async update(id: number, data: Partial<NewModel>) {
    const result = await this.db
      .update(models)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(models.id, id))
      .returning();
    return result[0] || null;
  }

  async remove(id: number) {
    const result = await this.db
      .delete(models)
      .where(eq(models.id, id))
      .returning();
    return result[0] || null;
  }
}

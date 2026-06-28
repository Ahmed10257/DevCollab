import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { models, NewModel } from '../drizzle/schema/model.schema';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class ModelRepository {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
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
    const result = await insertReturning(this.db, models, data);
    return result[0];
  }

  async update(id: number, data: Partial<NewModel>) {
    const result = await updateReturning(this.db, models, eq(models.id, id), {
      ...data,
      updatedAt: new Date(),
    });
    return result[0] || null;
  }

  async remove(id: number) {
    const result = await deleteReturningById(this.db, models, id);
    return result[0] || null;
  }
}

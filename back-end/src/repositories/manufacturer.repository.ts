import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { manufacturers, NewManufacturer } from '../drizzle/schema/manufacturer.schema';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class ManufacturerRepository {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {}

  async findAll() {
    return this.db.select().from(manufacturers);
  }

  async findOne(id: number) {
    const result = await this.db
      .select()
      .from(manufacturers)
      .where(eq(manufacturers.id, id))
      .limit(1);
    return result[0] || null;
  }

  async create(data: NewManufacturer) {
    const result = await insertReturning(this.db, manufacturers, data);
    return result[0];
  }

  async update(id: number, data: Partial<NewManufacturer>) {
    const result = await updateReturning(this.db, manufacturers, eq(manufacturers.id, id), {
      ...data,
      updatedAt: new Date(),
    });
    return result[0] || null;
  }

  async remove(id: number) {
    const result = await deleteReturningById(this.db, manufacturers, id);
    return result[0] || null;
  }
}

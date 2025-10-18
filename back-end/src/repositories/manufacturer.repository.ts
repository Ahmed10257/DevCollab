import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.module';
import * as schema from '../drizzle/schema/schema';
import { manufacturers, NewManufacturer } from '../drizzle/schema/manufacturer.schema';

@Injectable()
export class ManufacturerRepository {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
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
    const result = await this.db.insert(manufacturers).values(data).returning();
    return result[0];
  }

  async update(id: number, data: Partial<NewManufacturer>) {
    const result = await this.db
      .update(manufacturers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(manufacturers.id, id))
      .returning();
    return result[0] || null;
  }

  async remove(id: number) {
    const result = await this.db
      .delete(manufacturers)
      .where(eq(manufacturers.id, id))
      .returning();
    return result[0] || null;
  }
}

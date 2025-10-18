import { Inject, Injectable } from '@nestjs/common';
import { eq, and, or, like, SQL } from 'drizzle-orm';
import { assets } from '../drizzle/schema/asset.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';

export interface AssetFilters {
  categoryId?: number;
  typeId?: number;
  branchId?: number;
  buildingId?: number;
  floorId?: number;
  roomId?: number;
  status?: string;
  assignedUserId?: number;
  responsibleUserId?: number;
  searchTerm?: string;
}

@Injectable()
export class AssetRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll(filters?: AssetFilters) {
    const conditions: SQL[] = [];

    if (filters?.categoryId) {
      conditions.push(eq(assets.categoryId, filters.categoryId));
    }
    if (filters?.typeId) {
      conditions.push(eq(assets.typeId, filters.typeId));
    }
    if (filters?.branchId) {
      conditions.push(eq(assets.branchId, filters.branchId));
    }
    if (filters?.buildingId) {
      conditions.push(eq(assets.buildingId, filters.buildingId));
    }
    if (filters?.floorId) {
      conditions.push(eq(assets.floorId, filters.floorId));
    }
    if (filters?.roomId) {
      conditions.push(eq(assets.roomId, filters.roomId));
    }
    if (filters?.status) {
      conditions.push(eq(assets.status, filters.status));
    }
    if (filters?.assignedUserId) {
      conditions.push(eq(assets.assignedUserId, filters.assignedUserId));
    }
    if (filters?.responsibleUserId) {
      conditions.push(eq(assets.responsibleUserId, filters.responsibleUserId));
    }
    if (filters?.searchTerm) {
      const searchCondition = or(
        like(assets.name, `%${filters.searchTerm}%`),
        like(assets.serialNumber, `%${filters.searchTerm}%`),
        like(assets.brand, `%${filters.searchTerm}%`),
        like(assets.model, `%${filters.searchTerm}%`),
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    if (conditions.length === 0) {
      return await this.db.select().from(assets);
    }

    return await this.db
      .select()
      .from(assets)
      .where(and(...conditions));
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(assets)
      .where(eq(assets.id, id));
    return result[0];
  }

  async findBySerialNumber(serialNumber: string) {
    const result = await this.db
      .select()
      .from(assets)
      .where(eq(assets.serialNumber, serialNumber));
    return result[0];
  }

  async create(data: typeof assets.$inferInsert) {
    const result = await this.db
      .insert(assets)
      .values(data)
      .returning();
    return result[0];
  }

  async update(id: number, data: Partial<typeof assets.$inferInsert>) {
    const result = await this.db
      .update(assets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(assets.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const result = await this.db
      .delete(assets)
      .where(eq(assets.id, id))
      .returning();
    return result[0];
  }
}

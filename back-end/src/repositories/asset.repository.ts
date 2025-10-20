import { Inject, Injectable } from '@nestjs/common';
import { eq, and, or, like, SQL } from 'drizzle-orm';
import { assets } from '../drizzle/schema/asset.schema';
import { servers } from '../drizzle/schema/server.schema';
import { racks } from '../drizzle/schema/rack.schema';
import { printers } from '../drizzle/schema/printer.schema';
import { projectors } from '../drizzle/schema/projector.schema';
import { cameras } from '../drizzle/schema/camera.schema';
import { ipPhones } from '../drizzle/schema/ip-phone.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';

export interface AssetFilters {
categoryId?: number;
typeId?: number;
manufacturerId?: number;
modelId?: number;
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
if (filters?.manufacturerId) {
conditions.push(eq(assets.manufacturerId, filters.manufacturerId));
}
if (filters?.modelId) {
conditions.push(eq(assets.modelId, filters.modelId));
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
like(assets.notes, `%${filters.searchTerm}%`),
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
const result = await this.db.select().from(assets).where(eq(assets.id, id));
return result[0];
}

async findBySerialNumber(serialNumber: string) {
const result = await this.db
.select()
.from(assets)
.where(eq(assets.serialNumber, serialNumber));
return result[0];
}

/**
 * Fetch asset with its category-specific details
 * Joins with servers, racks, printers, projectors, cameras, or ip_phones based on categoryId
 */
async findByIdWithDetails(id: number) {
const asset = await this.findById(id);
if (!asset) return null;

// Fetch category-specific details based on asset's category
let categoryDetails: any = null;

switch (asset.categoryId) {
case 7: // Servers
const serverResult = await this.db
.select()
.from(servers)
.where(eq(servers.assetId, id));
categoryDetails = serverResult[0];
break;

case 8: // Racks
const rackResult = await this.db
.select()
.from(racks)
.where(eq(racks.assetId, id));
categoryDetails = rackResult[0];
break;

case 9: // Printers
const printerResult = await this.db
.select()
.from(printers)
.where(eq(printers.assetId, id));
categoryDetails = printerResult[0];
break;

case 10: // Projectors
const projectorResult = await this.db
.select()
.from(projectors)
.where(eq(projectors.assetId, id));
categoryDetails = projectorResult[0];
break;

case 11: // Cameras
const cameraResult = await this.db
.select()
.from(cameras)
.where(eq(cameras.assetId, id));
categoryDetails = cameraResult[0];
break;

case 12: // IP Phones
const phoneResult = await this.db
.select()
.from(ipPhones)
.where(eq(ipPhones.assetId, id));
categoryDetails = phoneResult[0];
break;
}

return {
...asset,
details: categoryDetails,
};
}

async create(data: typeof assets.$inferInsert) {
const result = await this.db.insert(assets).values(data).returning();
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

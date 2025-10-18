export interface Asset {
  id: number;
  name: string;
  categoryId: number;
  typeId: number;
  serialNumber: string;
  brand?: string;
  model?: string;
  branchId?: number;
  buildingId?: number;
  floorId?: number;
  roomId?: number;
  status: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  responsibleUserId?: number;
  assignedUserId?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetDto {
  name: string;
  categoryId: number;
  typeId: number;
  serialNumber: string;
  brand?: string;
  model?: string;
  branchId?: number;
  buildingId?: number;
  floorId?: number;
  roomId?: number;
  status: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  responsibleUserId?: number;
  assignedUserId?: number;
  notes?: string;
}

export interface UpdateAssetDto {
  name?: string;
  categoryId?: number;
  typeId?: number;
  serialNumber?: string;
  brand?: string;
  model?: string;
  branchId?: number;
  buildingId?: number;
  floorId?: number;
  roomId?: number;
  status?: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  responsibleUserId?: number;
  assignedUserId?: number;
  notes?: string;
}

export interface AssetFilter {
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

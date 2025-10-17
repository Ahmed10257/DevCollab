export interface Floor {
  id: number;
  name: string;
  buildingId: number;
  createdAt?: Date;
}

export interface CreateFloorDto {
  name: string;
  buildingId: number;
}

export interface UpdateFloorDto {
  name?: string;
  buildingId?: number;
}

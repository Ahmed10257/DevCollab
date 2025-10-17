export interface Building {
  id: number;
  name: string;
  branchId: number;
  createdAt?: Date;
}

export interface CreateBuildingDto {
  name: string;
  branchId: number;
}

export interface UpdateBuildingDto {
  name?: string;
  branchId?: number;
}

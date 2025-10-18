export interface Model {
  id: number;
  name: string;
  manufacturerId: number;
  modelNumber?: string;
  description?: string;
  specifications?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateModelDto {
  name: string;
  manufacturerId: number;
  modelNumber?: string;
  description?: string;
  specifications?: string;
}

export interface UpdateModelDto {
  name?: string;
  manufacturerId?: number;
  modelNumber?: string;
  description?: string;
  specifications?: string;
}

export interface Type {
  id: number;
  name: string;
  categoryId: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTypeDto {
  name: string;
  categoryId: number;
  description?: string;
}

export interface UpdateTypeDto {
  name?: string;
  categoryId?: number;
  description?: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  description?: string;
  website?: string;
  supportEmail?: string;
  supportPhone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateManufacturerDto {
  name: string;
  description?: string;
  website?: string;
  supportEmail?: string;
  supportPhone?: string;
}

export interface UpdateManufacturerDto {
  name?: string;
  description?: string;
  website?: string;
  supportEmail?: string;
  supportPhone?: string;
}

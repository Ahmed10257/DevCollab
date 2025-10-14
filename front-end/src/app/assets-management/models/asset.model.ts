export interface Asset {
  id?: number;
  serial: string;
  type: string;
  name: string;
  owner: string;
  location: string;
  category: string;
  ownedBy?: string;
  quantity?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssetFilter {
  type?: string;
  ownedBy?: string;
  location?: string;
}

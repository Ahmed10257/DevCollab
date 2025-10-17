export interface Branch {
  id: number;
  name: string;
  createdAt?: Date;
}

export interface CreateBranchDto {
  name: string;
}

export interface UpdateBranchDto {
  name?: string;
}

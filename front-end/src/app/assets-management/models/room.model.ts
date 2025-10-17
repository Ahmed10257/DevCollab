export interface Room {
  id: number;
  name: string;
  floorId: number;
  createdAt?: Date;
}

export interface CreateRoomDto {
  name: string;
  floorId: number;
}

export interface UpdateRoomDto {
  name?: string;
  floorId?: number;
}

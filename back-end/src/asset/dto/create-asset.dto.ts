import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId!: number;

  @IsNotEmpty()
  @IsNumber()
  typeId!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  serialNumber!: string;

  @IsOptional()
  @IsNumber()
  manufacturerId?: number;

  @IsOptional()
  @IsNumber()
  modelId?: number;

  // Location hierarchy - all optional
  @IsOptional()
  @IsNumber()
  branchId?: number;

  @IsOptional()
  @IsNumber()
  buildingId?: number;

  @IsOptional()
  @IsNumber()
  floorId?: number;

  @IsOptional()
  @IsNumber()
  roomId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  status?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @IsOptional()
  @IsDateString()
  warrantyExpiry?: string;

  @IsOptional()
  @IsNumber()
  responsibleUserId?: number;

  @IsOptional()
  @IsNumber()
  assignedUserId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}

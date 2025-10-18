import { IsString, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsInt()
  manufacturerId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  modelNumber?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  specifications?: string;
}

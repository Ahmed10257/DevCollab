import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}

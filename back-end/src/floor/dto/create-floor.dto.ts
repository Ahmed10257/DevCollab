import { IsNotEmpty, IsString, MaxLength, IsInt, IsPositive } from 'class-validator';

export class CreateFloorDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    buildingId!: number;
}

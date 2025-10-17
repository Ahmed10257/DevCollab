import { IsNotEmpty, IsString, MaxLength, IsInt, IsPositive } from 'class-validator';

export class CreateBuildingDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    branchId!: number;
}

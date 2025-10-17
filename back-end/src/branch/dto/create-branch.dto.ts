import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBranchDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name!: string;
}

import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 15)
    name!: string;

    @IsInt()
    @IsOptional()
    leaderId!: number | null;
}
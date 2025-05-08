import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Length(6, 55)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'user@example.com' })
    email!: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 255)
    @Type(() => String)
    @ApiProperty({ example: 'password123' })
    password!: string;


    @IsBoolean()
    @IsOptional()
    is_leader!: boolean;

    @IsInt()
    @IsOptional()
    teamId: number | null = null;
}

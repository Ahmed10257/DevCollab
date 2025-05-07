import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'user@example.com' })
    email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'password123' })
    password!: string;


    is_leader!: boolean;

    @IsInt()
    @IsOptional()
    teamId: number | null = null;
}

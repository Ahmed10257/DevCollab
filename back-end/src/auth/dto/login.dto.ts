import { IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
    @ApiPropertyOptional({
        example: 'user@egypt.aast.edu',
        description: 'AD user principal name (UPN) or SAM account name',
    })
    @ValidateIf((dto: LoginDto) => !dto.email)
    @IsString()
    userName?: string;

    @ApiPropertyOptional({
        example: 'user@egypt.aast.edu',
        description: 'Alias for userName (UPN) for existing clients',
    })
    @ValidateIf((dto: LoginDto) => !dto.userName)
    @IsString()
    email?: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @MinLength(1)
    password!: string;

    /** Resolved AD login principal (UPN or SAM). */
    get principal(): string {
        return (this.userName ?? this.email ?? '').trim();
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Trim } from '../../../decorators/transforms.decorator';

export class UserCreateDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsOptional()
    @Trim()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly phone: string;

    @ApiProperty()
    @Trim()
    @IsString()
    @IsOptional()
    readonly telegramId: string;

    @ApiProperty()
    @Trim()
    @IsString()
    @IsOptional()
    readonly walletId: string;

    @ApiProperty({ minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @Trim()
    readonly password: string;
}

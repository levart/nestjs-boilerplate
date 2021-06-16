import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Trim } from '../../../decorators/transforms.decorator';

export class UserUpdateDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @Trim()
  @IsOptional()
  readonly status: number;

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

  @ApiProperty()
  @Trim()
  @IsOptional()
  readonly balance: number;
}

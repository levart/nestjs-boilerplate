import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { UserEntity } from '../user.entity';
import { AbstractDto } from '../../../common/dtos/Abstract.dto';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  status: number;

  @ApiPropertyOptional()
  telegramId: string;

  @ApiPropertyOptional()
  walletId: string;

  @ApiPropertyOptional()
  balance: number;

  @ApiHideProperty()
  password: string;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.phone = user.phone;
    this.status = user.status;
    this.telegramId = user.telegramId;
    this.walletId = user.walletId;
    this.balance = user.balance;
  }
}

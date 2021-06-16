import { AbstractDto } from 'src/common/dtos/Abstract.dto';
import { Column, Entity, Index } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserDto } from './dto/User.dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({
    name: 'first_name',
    nullable: true,
    type: 'character varying',
    length: 20,
  })
  @Index()
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: true,
    type: 'character varying',
    length: 50,
  })
  @Index()
  lastName: string;

  @Column({
    name: 'identity_number',
    nullable: true,
    type: 'character varying',
    length: 20,
  })
  @Index()
  identityNumber: string;

  @Column({
    name: 'passport_number',
    nullable: true,
    type: 'character varying',
    length: 20,
  })
  passportNumber: string;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  @Index()
  email: string;

  @Column({
    select: false,
    nullable: true,
    type: 'character varying',
    length: 255,
  })
  password: string;

  @Column({
    nullable: true,
    length: 20,
    type: 'character varying',
    array: false,
  })
  phone: string;

  @Column({ nullable: true, type: 'smallint' })
  status: number;

  @Column({ name: 'is_active', default: true, type: 'boolean' })
  isActive: number;

  dtoClass = UserDto;
}

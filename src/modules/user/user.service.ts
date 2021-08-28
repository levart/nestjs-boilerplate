import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDto } from './dto/User.dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../common/dtos/page.dto';
import { ExceptionType } from '../../common/exceptions/types/ExceptionType';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneForAuth(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        select: ['id', 'email', 'password', 'phone', 'status'],
        where: { email },
      });
    } catch (e) {
      console.error('Error', e.message);
      throw new ExceptionType(e.statusCode, e.message);
    }
  }

  async findOne(userId: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) throw new ExceptionType(404, 'User not found');
      return new UserDto(user);
    } catch (e) {
      console.error('Error', e.message);
      throw new ExceptionType(e.statusCode, e.message);
    }
  }

  async create(userCreateDto: UserCreateDto): Promise<UserDto> {
    if (!userCreateDto.email && !userCreateDto.phone) {
      throw new ExceptionType(
        400,
        'One of the fields is required: email, phone, telegramId',
      );
    }
    try {
      const user = this.userRepository.create(userCreateDto);
      const createdUser = await this.userRepository.save(user);
      return new UserDto(createdUser);
    } catch (e) {
      console.error('Error', e.message);
      throw new ExceptionType(e.statusCode, e.message);
    }
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PaginationDto<UserDto>> {
    const { q } = pageOptionsDto;

    try {
      const queryBuilder = this.userRepository.createQueryBuilder('user');
      if (q) {
        queryBuilder
          .where(`user.email ILIKE '%${q}%'`)
          .orWhere(`user.phone ILIKE '%${q}%'`)
          .orWhere(`user.telegram_id ILIKE '%${q}%'`)
          .orWhere(`user.wallet_id ILIKE '%${q}%'`);
      }
      const totalCount = await queryBuilder.getCount();
      const items = await queryBuilder
        .offset(pageOptionsDto.skip)
        .limit(pageOptionsDto.limit)
        .getMany();
      return new PaginationDto(items, {
        totalCount,
        page: pageOptionsDto.page,
        limit: pageOptionsDto.limit,
      });
    } catch (e) {
      console.error('Error', e.message);
      throw new ExceptionType(e.statusCode, e.message);
    }
  }

  async update(userId: string, dto: UserUpdateDto): Promise<UserDto> {
    try {
      await this.userRepository.update(
        { id: userId },
        {
          email: dto.email,
          phone: dto.phone,
          status: dto.status,
        },
      );
      return await this.findOne(userId);
    } catch (e) {
      console.error('Error', e.message);
      throw new ExceptionType(e.statusCode, e.message);
    }
  }

  async delete(
    userId: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      const user = await this.findOne(userId);
      await this.userRepository.delete(user.id);
      return { deleted: true };
    } catch (e) {
      console.error('Error', e.message);
      throw new ExceptionType(e.statusCode, e.message);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/User.dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { DeleteResult } from 'typeorm';
import { PaginationDto } from '../../common/dtos/page.dto';
import { Auth } from '../../decorators/http.decorators';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: PaginationDto,
  })
  async getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PaginationDto<UserDto>> {
    return await this.userService.getUsers(pageOptionsDto);
  }

  @Post()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create user',
    type: UserDto,
  })
  async create(
    @Body(new ValidationPipe({ transform: true }))
    dto: UserCreateDto,
  ): Promise<UserDto> {
    return await this.userService.create(dto);
  }

  @Get(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users by userId',
    type: UserDto,
  })
  getUser(@Param('id') userId: string): Promise<UserDto> {
    return this.userService.findOne(userId);
  }

  @Put(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user',
    type: UserDto,
  })
  async update(
    @Param('id') userId: string,
    @Body(new ValidationPipe({ transform: true })) dto: UserUpdateDto,
  ): Promise<UserDto> {
    return await this.userService.update(userId, dto);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete user',
    type: DeleteResult,
  })
  async delete(
    @Param('id') userId: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    return await this.userService.delete(userId);
  }
}

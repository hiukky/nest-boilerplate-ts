import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common'

import { ValidationPipe } from '../../pipes'

import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { UserDto } from './dto/user.dto'

@Controller({ path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(): Promise<UserEntity[]> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async show(@Param() id: number): Promise<UserEntity> {
    return await this.userService.findOne(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() userDto: UserDto): Promise<UserEntity> {
    return this.userService.create(userDto)
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param() id: number,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, userDto)
  }

  @Delete(':id')
  async remove(@Param() id: number): Promise<number> {
    return await this.userService.delete(id)
  }
}

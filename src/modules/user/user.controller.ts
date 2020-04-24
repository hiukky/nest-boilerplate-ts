import { Response } from 'express'

import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UsePipes,
  NotFoundException,
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
  async store(@Body() userDto: UserDto, @Res() res: Response): Promise<object> {
    let user = await this.userService.create(userDto)

    return res.status(201).json({
      status: 201,
      message: 'Successful registered user.',
      user,
    })
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param() id: number,
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<object> {
    let user = await this.userService.findOne(id)

    if (!user) throw new NotFoundException({ message: 'Unregistered user.' })

    user = await this.userService.update(id, userDto)

    return res.status(200).json({
      status: 200,
      message: 'User updated successfully.',
      user,
    })
  }

  @Delete(':id')
  async remove(@Param() id: number, @Res() res: Response): Promise<object> {
    let user = await this.userService.findOne(id)

    if (!user) throw new NotFoundException({ message: 'Unregistered user.' })

    await this.userService.delete(id)

    return res.status(200).json({
      status: 200,
      message: 'User successfully deleted.',
      id: user.id,
    })
  }
}

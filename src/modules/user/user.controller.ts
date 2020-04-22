import { Controller, Get } from '@nestjs/common'

import { UserService } from './user.service'
import { UserEntity } from './user.entity'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async index(): Promise<UserEntity[]> {
    return await this.userService.findAll()
  }
}

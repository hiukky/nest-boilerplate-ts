import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common'

import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async users(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }

  @Query(() => UserEntity)
  async showUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.findOne(id)
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('input') input: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(input)
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.update(id, input)
  }

  @Mutation(() => UserEntity)
  async deleteUser(@Args('id') id: number): Promise<UserEntity> {
    let user = await this.userService.findOne(id)

    if (!user) throw new NotFoundException({ message: 'Unregistered user.' })

    await this.userService.delete(id)

    return user
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './user.entity'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id)
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async create(userDto: UserDto): Promise<UserEntity> {
    return await this.userRepository.create(userDto).save()
  }

  async update(id: number, userDto: UserDto): Promise<UserEntity> {
    await this.userRepository.update(id, userDto)
    return await this.userRepository.findOne(id)
  }

  async delete(id: number): Promise<number> {
    return (await this.userRepository.delete(id)).raw
  }
}

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

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

  async create(input: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.create(input).save()
  }

  async update(id: number, input: CreateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, { ...input })
    return await this.userRepository.findOne(id)
  }

  async delete(id: number): Promise<number> {
    return (await this.userRepository.delete(id)).raw
  }
}

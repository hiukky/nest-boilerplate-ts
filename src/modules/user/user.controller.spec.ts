import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { OrmConfig } from '../../configs'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env', '.env.test'],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useClass: OrmConfig,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UserService],
      controllers: [UserController],
    }).compile()

    userService = moduleRef.get<UserService>(UserService)
    userController = moduleRef.get<UserController>(UserController)
  })

  describe('findAll', () => {
    it('Return all users', async () => {
      const result: UserEntity[] = []

      jest.spyOn(userService, 'findAll').mockImplementation(async () => result)

      expect(await userController.index()).toBe(result)
    })
  })
})

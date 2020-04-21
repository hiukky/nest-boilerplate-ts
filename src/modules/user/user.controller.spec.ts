import { Test, TestingModule } from '@nestjs/testing'

import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('User Controller', () => {
  let userController: UserController

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile()

    userController = user.get<UserController>(UserController)
  })

  describe('root', () => {
    it('Return an array of empty users.', () => {
      expect(userController.findAll()).toEqual([])
    })
  })
})

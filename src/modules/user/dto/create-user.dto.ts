import { IsString, IsEmail } from 'class-validator'
import { InputType } from '@nestjs/graphql'

import { CreateUserInput } from '../../../graphql'

@InputType()
export class CreateUserDto implements CreateUserInput {
  @IsString({ message: 'The name field is required.' })
  name: string

  @IsString({ message: 'The email field is required.' })
  @IsEmail({}, { message: 'The informed email is invalid.' })
  email: string
}

import { IsString, IsEmail } from 'class-validator'

export class UserDto {
  @IsString({ message: 'The name field is required.' })
  name: string

  @IsString({ message: 'The email field is required.' })
  @IsEmail({}, { message: 'The informed email is invalid.' })
  email: string
}

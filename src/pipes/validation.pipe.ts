import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const [error] = await validate(object)

    if (error) {
      throw new UnprocessableEntityException({
        message: Object.values(error.constraints)[0] || 'Validation failed',
        property: error.property,
      })
    }

    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}

import { Request, Response } from 'express'

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const error =
      exception instanceof HttpException
        ? (exception.getResponse() as object)
        : { message: 'Internal server error' }
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    delete error['statusCode']

    response.status(status).json({
      status: status,
      path: request.url,
      method: request.method,
      error,
      timestamp: new Date().toISOString(),
    })
  }
}

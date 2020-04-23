import * as helmet from 'helmet'

import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  app.use(helmet())

  app.enableCors({
    origin: true,
    methods: ['GET', 'HEAD', 'POST'],
    exposedHeaders: [
      'cache-control',
      'content-language',
      'content-type',
      'expires',
      'last-modified',
      'pragma',
    ],
    credentials: true,
    maxAge: 90,
  })

  await app.listen(
    configService.get('PORT', 3333),
    configService.get('HOST', '0.0.0.0'),
  )
}

bootstrap()

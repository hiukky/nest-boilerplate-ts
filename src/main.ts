import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'

import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

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

  app.use(helmet())

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  )

  await app.listen(
    configService.get('PORT', 3333),
    configService.get('HOST', '0.0.0.0'),
  )
}

bootstrap()

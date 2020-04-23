import { ConfigService } from '@nestjs/config'
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm'

export class OrmConfig {
  static get test(): TypeOrmModuleOptions {
    return {
      migrationsRun: true,
      entities: [`${process.cwd()}/src/modules/**/*.entity.{ts,js}`],
      migrations: [`${process.cwd()}/src/migrations/**/*.{ts,js}`],
      cli: {
        migrationsDir: `${process.cwd()}/src/migrations`,
      },
    }
  }

  static get development(): TypeOrmModuleOptions {
    return {
      entities: [`${process.cwd()}/dist/src/modules/**/*.entity.{ts,js}`],
      migrations: [`${process.cwd()}/dist/src/migrations/**/*.{ts,js}`],
      cli: {
        migrationsDir: `${process.cwd()}/src/migrations`,
      },
    }
  }

  static get production(): TypeOrmModuleOptions {
    return {
      entities: [`${process.cwd()}/dist/src/modules/**/*.entity.{ts,js}`],
      migrations: [`${process.cwd()}/dist/src/migrations/**/*.{ts,js}`],
    }
  }

  static config(configService: ConfigService): TypeOrmModuleAsyncOptions {
    return {
      ...OrmConfig[configService.get('NODE_ENV')],
      type: configService.get('DB_CLIENT', 'sqlite') as any,
      host: configService.get('DB_HOST', 'localhost'),
      port: +configService.get('DB_PORT', 5432),
      username: configService.get('DB_USER', 'sqlite'),
      password: configService.get('DB_PASS', 'sqlite'),
      database: configService.get('DB_NAME', 'sqlite'),
    }
  }
}

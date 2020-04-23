import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  get test(): TypeOrmModuleOptions {
    return {
      migrationsRun: true,
      entities: [`${process.cwd()}/src/modules/**/*.entity.{ts,js}`],
      migrations: [`${process.cwd()}/src/migrations/**/*.{ts,js}`],
    }
  }

  get default(): TypeOrmModuleOptions {
    return {
      entities: [`${process.cwd()}/dist/src/modules/**/*.entity.{ts,js}`],
      migrations: [`${process.cwd()}/dist/src/migrations/**/*.{ts,js}`],
      cli: {
        migrationsDir: `${process.cwd()}/src/migrations`,
      },
    }
  }

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    let baseConfig =
      this.configService.get('NODE_ENV') === 'test' ? 'test' : 'default'

    return {
      ...this[baseConfig],
      type: this.configService.get('DB_CLIENT', 'sqlite') as any,
      host: this.configService.get('DB_HOST', 'localhost'),
      port: +this.configService.get('DB_PORT', 5432),
      username: this.configService.get('DB_USER', 'sqlite'),
      password: this.configService.get('DB_PASS', 'sqlite'),
      database: this.configService.get('DB_NAME', 'sqlite'),
    }
  }
}

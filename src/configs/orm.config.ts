import { ConfigService } from '@nestjs/config'
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import * as Config from '../../ormconfig.json'

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return (Config.find(
      (cfg: TypeOrmModuleAsyncOptions) =>
        cfg.name === this.configService.get('NODE_ENV'),
    ) ||
      Config.find(
        (cfg: TypeOrmModuleAsyncOptions) => cfg.name === 'default',
      )) as TypeOrmModuleOptions
  }
}

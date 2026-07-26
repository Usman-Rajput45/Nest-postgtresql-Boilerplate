import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import type { EnvConfig } from '../config/env.config';
import { APP_ENV } from '../config/injection-tokens';
import { buildSequelizeModuleOptions } from './sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [APP_ENV],
      useFactory: (env: EnvConfig) => buildSequelizeModuleOptions(env),
    }),
  ],
})
export class DatabaseModule {}

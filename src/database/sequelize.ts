import type { SequelizeModuleOptions } from '@nestjs/sequelize';
import type { EnvConfig } from '../config/env.config';
import { User } from './models/user.model';

export function buildSequelizeModuleOptions(env: EnvConfig): SequelizeModuleOptions {
  return {
    dialect: 'postgres',
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    models: [User],
    autoLoadModels: true,
    logging: env.nodeEnv === 'development' ? console.log : false,
    define: {
      underscored: true,
      timestamps: true,
    },
  };
}

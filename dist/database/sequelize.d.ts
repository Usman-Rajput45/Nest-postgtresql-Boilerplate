import type { SequelizeModuleOptions } from '@nestjs/sequelize';
import type { EnvConfig } from '../config/env.config';
export declare function buildSequelizeModuleOptions(env: EnvConfig): SequelizeModuleOptions;

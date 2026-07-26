import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_ENV, JWT_ENV } from './injection-tokens';
import type { EnvConfig } from './env.config';
import { loadEnvConfig } from './env.config';
import { buildJwtEnvConfig } from './jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: APP_ENV,
      useFactory: () => loadEnvConfig(),
    },
    {
      provide: JWT_ENV,
      useFactory: (env: EnvConfig) => buildJwtEnvConfig(env),
      inject: [APP_ENV],
    },
  ],
  exports: [APP_ENV, JWT_ENV],
})
export class ConfigEnvModule {}

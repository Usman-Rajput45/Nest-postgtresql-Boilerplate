import { Module } from '@nestjs/common';
import { ConfigEnvModule } from './config/config-env.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigEnvModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    HealthModule,
  ],
})
export class AppModule {}

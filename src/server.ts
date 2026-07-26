import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import type { EnvConfig } from './config/env.config';
import { APP_ENV } from './config/injection-tokens';
import { HttpErrorFilter } from './middlewares/error.middleware';
import { createGlobalValidationPipe } from './middlewares/validation.middleware';
import { logger } from './utils/logger.util';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(createGlobalValidationPipe());
  const env = app.get<EnvConfig>(APP_ENV);
  await app.listen(env.port);
  logger.log(`HTTP server listening on port ${env.port}`);
}

void bootstrap();

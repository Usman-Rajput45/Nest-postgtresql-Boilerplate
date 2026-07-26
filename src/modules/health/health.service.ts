import { Inject, Injectable } from '@nestjs/common';
import type { EnvConfig } from '../../config/env.config';
import { APP_ENV } from '../../config/injection-tokens';
import type { HealthStatus } from './health.types';

@Injectable()
export class HealthService {
  constructor(@Inject(APP_ENV) private readonly env: EnvConfig) {}

  getStatus(): HealthStatus {
    return {
      uptimeSeconds: Math.floor(process.uptime()),
      environment: this.env.nodeEnv,
    };
  }
}

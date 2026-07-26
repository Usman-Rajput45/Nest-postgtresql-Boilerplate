import type { EnvConfig } from '../../config/env.config';
import type { HealthStatus } from './health.types';
export declare class HealthService {
    private readonly env;
    constructor(env: EnvConfig);
    getStatus(): HealthStatus;
}

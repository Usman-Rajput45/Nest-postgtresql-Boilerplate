import type { EnvConfig } from './env.config';
export type JwtEnvConfig = {
    secret: string;
    expiresIn: string;
};
export declare function buildJwtEnvConfig(env: EnvConfig): JwtEnvConfig;

import type { EnvConfig } from './env.config';

export type JwtEnvConfig = {
  secret: string;
  expiresIn: string;
};

export function buildJwtEnvConfig(env: EnvConfig): JwtEnvConfig {
  return {
    secret: env.jwt.secret,
    expiresIn: env.jwt.expiresIn,
  };
}

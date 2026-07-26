import { Inject, Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import type { EnvConfig } from '../config/env.config';
import { buildJwtEnvConfig } from '../config/jwt.config';
import { APP_ENV } from '../config/injection-tokens';
import { MESSAGES } from '../constants/messages.constant';
import { Role } from '../enums/role.enum';
import { AuthError } from '../errors/auth.error';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { verifyAccessToken } from '../utils/jwt.util';

function extractBearerToken(headerValue: string | undefined): string | null {
  if (headerValue === undefined || headerValue.length === 0) {
    return null;
  }
  const parts = headerValue.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  return parts[1] ?? null;
}

function isRole(value: string): value is Role {
  return (Object.values(Role) as string[]).includes(value);
}

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(@Inject(APP_ENV) private readonly env: EnvConfig) {}

  use(req: Request, _res: Response, next: NextFunction): void {
    const token = extractBearerToken(req.headers.authorization);
    if (token === null) {
      throw new AuthError(MESSAGES.AUTH.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED);
    }
    const jwtConfig = buildJwtEnvConfig(this.env);
    const payload = verifyAccessToken(token, jwtConfig);
    if (!isRole(payload.role)) {
      throw new AuthError(MESSAGES.AUTH.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
    }
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    next();
  }
}

import * as jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { TokenType } from '../enums/token-type.enum';
import type { JwtEnvConfig } from '../config/jwt.config';
import { AuthError } from '../errors/auth.error';
import { MESSAGES } from '../constants/messages.constant';
import { STATUS_CODES } from '../constants/status-codes.constant';

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: string;
  type: TokenType;
};

export function signAccessToken(
  payload: Omit<AccessTokenPayload, 'type'>,
  config: JwtEnvConfig,
): string {
  const body: AccessTokenPayload = {
    ...payload,
    type: TokenType.ACCESS,
  };
  const signOptions: SignOptions = {
    expiresIn: config.expiresIn as SignOptions['expiresIn'],
    algorithm: 'HS256',
  };
  return jwt.sign(body, config.secret, signOptions);
}

export function verifyAccessToken(
  token: string,
  config: JwtEnvConfig,
): AccessTokenPayload {
  try {
    const decoded = jwt.verify(token, config.secret, {
      algorithms: ['HS256'],
    });
    if (typeof decoded === 'string' || decoded === null) {
      throw new AuthError(MESSAGES.AUTH.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
    }
    const record = decoded as Record<string, unknown>;
    if (record.type !== TokenType.ACCESS) {
      throw new AuthError(MESSAGES.AUTH.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
    }
    return decoded as AccessTokenPayload;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError(MESSAGES.AUTH.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
  }
}

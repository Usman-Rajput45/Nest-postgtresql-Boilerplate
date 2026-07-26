import { TokenType } from '../enums/token-type.enum';
import type { JwtEnvConfig } from '../config/jwt.config';
export type AccessTokenPayload = {
    sub: string;
    email: string;
    role: string;
    type: TokenType;
};
export declare function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>, config: JwtEnvConfig): string;
export declare function verifyAccessToken(token: string, config: JwtEnvConfig): AccessTokenPayload;

import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES } from '../../constants/messages.constant';
import { STATUS_CODES } from '../../constants/status-codes.constant';
import type { JwtEnvConfig } from '../../config/jwt.config';
import { JWT_ENV } from '../../config/injection-tokens';
import { BaseError } from '../../errors/base.error';
import { AuthError } from '../../errors/auth.error';
import { comparePassword, hashPassword } from '../../utils/password.util';
import { signAccessToken } from '../../utils/jwt.util';
import { UserService } from '../user/user.service';
import type { LoginDto, RegisterDto } from './auth.dto';
import type { LoginResult, RegisterResult } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(JWT_ENV) private readonly jwtConfig: JwtEnvConfig,
  ) {}

  private async assertEmailIsAvailable(email: string): Promise<void> {
    const existing = await this.userService.findByEmail(email);
    if (existing !== null) {
      throw new BaseError(
        MESSAGES.AUTH.EMAIL_ALREADY_EXISTS,
        STATUS_CODES.CONFLICT,
      );
    }
  }

  private buildAccessTokenPayload(user: { id: string; email: string; role: string }) {
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
  }

  private createAccessTokenForUser(user: {
    id: string;
    email: string;
    role: string;
  }): string {
    return signAccessToken(this.buildAccessTokenPayload(user), this.jwtConfig);
  }

  async register(dto: RegisterDto): Promise<RegisterResult> {
    await this.assertEmailIsAvailable(dto.email);
    const passwordHash = await hashPassword(dto.password);
    const user = await this.userService.createUser({
      email: dto.email,
      passwordHash,
    });
    const accessToken = this.createAccessTokenForUser(user);
    return { user, accessToken };
  }

  async login(dto: LoginDto): Promise<LoginResult> {
    const record = await this.userService.findCredentialByEmail(dto.email);
    if (record === null) {
      throw new AuthError(
        MESSAGES.AUTH.INVALID_CREDENTIALS,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    const passwordMatches = await comparePassword(dto.password, record.password);
    if (!passwordMatches) {
      throw new AuthError(
        MESSAGES.AUTH.INVALID_CREDENTIALS,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    const user = await this.userService.findPublicById(record.id);
    if (user === null) {
      throw new AuthError(
        MESSAGES.AUTH.INVALID_CREDENTIALS,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    const accessToken = this.createAccessTokenForUser(user);
    return { user, accessToken };
  }
}

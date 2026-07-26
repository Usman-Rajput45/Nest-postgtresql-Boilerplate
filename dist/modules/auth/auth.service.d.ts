import type { JwtEnvConfig } from '../../config/jwt.config';
import { UserService } from '../user/user.service';
import type { LoginDto, RegisterDto } from './auth.dto';
import type { LoginResult, RegisterResult } from './auth.types';
export declare class AuthService {
    private readonly userService;
    private readonly jwtConfig;
    constructor(userService: UserService, jwtConfig: JwtEnvConfig);
    private assertEmailIsAvailable;
    private buildAccessTokenPayload;
    private createAccessTokenForUser;
    register(dto: RegisterDto): Promise<RegisterResult>;
    login(dto: LoginDto): Promise<LoginResult>;
}

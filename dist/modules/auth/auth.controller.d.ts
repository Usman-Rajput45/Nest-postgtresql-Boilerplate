import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("../../responses/api.response").ApiSuccessBody<import("./auth.types").RegisterResult>>;
    login(dto: LoginDto): Promise<import("../../responses/api.response").ApiSuccessBody<import("./auth.types").LoginResult>>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const messages_constant_1 = require("../../constants/messages.constant");
const status_codes_constant_1 = require("../../constants/status-codes.constant");
const injection_tokens_1 = require("../../config/injection-tokens");
const base_error_1 = require("../../errors/base.error");
const auth_error_1 = require("../../errors/auth.error");
const password_util_1 = require("../../utils/password.util");
const jwt_util_1 = require("../../utils/jwt.util");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtConfig) {
        this.userService = userService;
        this.jwtConfig = jwtConfig;
    }
    async assertEmailIsAvailable(email) {
        const existing = await this.userService.findByEmail(email);
        if (existing !== null) {
            throw new base_error_1.BaseError(messages_constant_1.MESSAGES.AUTH.EMAIL_ALREADY_EXISTS, status_codes_constant_1.STATUS_CODES.CONFLICT);
        }
    }
    buildAccessTokenPayload(user) {
        return {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
    }
    createAccessTokenForUser(user) {
        return (0, jwt_util_1.signAccessToken)(this.buildAccessTokenPayload(user), this.jwtConfig);
    }
    async register(dto) {
        await this.assertEmailIsAvailable(dto.email);
        const passwordHash = await (0, password_util_1.hashPassword)(dto.password);
        const user = await this.userService.createUser({
            email: dto.email,
            passwordHash,
        });
        const accessToken = this.createAccessTokenForUser(user);
        return { user, accessToken };
    }
    async login(dto) {
        const record = await this.userService.findCredentialByEmail(dto.email);
        if (record === null) {
            throw new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.INVALID_CREDENTIALS, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED);
        }
        const passwordMatches = await (0, password_util_1.comparePassword)(dto.password, record.password);
        if (!passwordMatches) {
            throw new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.INVALID_CREDENTIALS, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED);
        }
        const user = await this.userService.findPublicById(record.id);
        if (user === null) {
            throw new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.INVALID_CREDENTIALS, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED);
        }
        const accessToken = this.createAccessTokenForUser(user);
        return { user, accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(injection_tokens_1.JWT_ENV)),
    __metadata("design:paramtypes", [user_service_1.UserService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map
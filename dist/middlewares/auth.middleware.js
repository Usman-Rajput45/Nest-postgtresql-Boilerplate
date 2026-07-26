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
exports.JwtAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_config_1 = require("../config/jwt.config");
const injection_tokens_1 = require("../config/injection-tokens");
const messages_constant_1 = require("../constants/messages.constant");
const role_enum_1 = require("../enums/role.enum");
const auth_error_1 = require("../errors/auth.error");
const status_codes_constant_1 = require("../constants/status-codes.constant");
const jwt_util_1 = require("../utils/jwt.util");
function extractBearerToken(headerValue) {
    if (headerValue === undefined || headerValue.length === 0) {
        return null;
    }
    const parts = headerValue.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }
    return parts[1] ?? null;
}
function isRole(value) {
    return Object.values(role_enum_1.Role).includes(value);
}
let JwtAuthMiddleware = class JwtAuthMiddleware {
    constructor(env) {
        this.env = env;
    }
    use(req, _res, next) {
        try {
            const token = extractBearerToken(req.headers.authorization);
            if (token === null) {
                next(new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.UNAUTHORIZED, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED));
                return;
            }
            const jwtConfig = (0, jwt_config_1.buildJwtEnvConfig)(this.env);
            const payload = (0, jwt_util_1.verifyAccessToken)(token, jwtConfig);
            if (!isRole(payload.role)) {
                next(new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.INVALID_TOKEN, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED));
                return;
            }
            req.user = {
                id: payload.sub,
                email: payload.email,
                role: payload.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    }
};
exports.JwtAuthMiddleware = JwtAuthMiddleware;
exports.JwtAuthMiddleware = JwtAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.APP_ENV)),
    __metadata("design:paramtypes", [Object])
], JwtAuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map
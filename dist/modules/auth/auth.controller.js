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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const messages_constant_1 = require("../../constants/messages.constant");
const status_codes_constant_1 = require("../../constants/status-codes.constant");
const response_helper_1 = require("../../helpers/response.helper");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const auth_routes_1 = require("./auth.routes");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        const data = await this.authService.register(dto);
        return (0, response_helper_1.buildSuccessResponse)(messages_constant_1.MESSAGES.AUTH.REGISTER_SUCCESS, status_codes_constant_1.STATUS_CODES.CREATED, data);
    }
    async login(dto) {
        const data = await this.authService.login(dto);
        return (0, response_helper_1.buildSuccessResponse)(messages_constant_1.MESSAGES.AUTH.LOGIN_SUCCESS, status_codes_constant_1.STATUS_CODES.OK, data);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(auth_routes_1.AUTH_PATHS.REGISTER),
    (0, common_1.HttpCode)(status_codes_constant_1.STATUS_CODES.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)(auth_routes_1.AUTH_PATHS.LOGIN),
    (0, common_1.HttpCode)(status_codes_constant_1.STATUS_CODES.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(auth_routes_1.AUTH_ROUTE_PREFIX),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
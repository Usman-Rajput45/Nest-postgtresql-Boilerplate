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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const messages_constant_1 = require("../../constants/messages.constant");
const status_codes_constant_1 = require("../../constants/status-codes.constant");
const base_error_1 = require("../../errors/base.error");
const response_helper_1 = require("../../helpers/response.helper");
const user_service_1 = require("./user.service");
const user_routes_1 = require("./user.routes");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(req) {
        const userId = req.user?.id;
        if (userId === undefined) {
            throw new base_error_1.BaseError(messages_constant_1.MESSAGES.AUTH.UNAUTHORIZED, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED);
        }
        const profile = await this.userService.findPublicById(userId);
        if (profile === null) {
            throw new base_error_1.BaseError(messages_constant_1.MESSAGES.USER.NOT_FOUND, status_codes_constant_1.STATUS_CODES.NOT_FOUND);
        }
        return (0, response_helper_1.buildSuccessResponse)(messages_constant_1.MESSAGES.USER.PROFILE_RETRIEVED, status_codes_constant_1.STATUS_CODES.OK, profile);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(user_routes_1.USER_PATHS.ME),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(user_routes_1.USER_ROUTE_PREFIX),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
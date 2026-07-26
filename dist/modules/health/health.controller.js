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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const messages_constant_1 = require("../../constants/messages.constant");
const status_codes_constant_1 = require("../../constants/status-codes.constant");
const response_helper_1 = require("../../helpers/response.helper");
const health_service_1 = require("./health.service");
const health_routes_1 = require("./health.routes");
let HealthController = class HealthController {
    constructor(healthService) {
        this.healthService = healthService;
    }
    getHealth() {
        const data = this.healthService.getStatus();
        return (0, response_helper_1.buildSuccessResponse)(messages_constant_1.MESSAGES.HEALTH.OK, status_codes_constant_1.STATUS_CODES.OK, data);
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(health_routes_1.HEALTH_PATHS.STATUS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)(health_routes_1.HEALTH_ROUTE_PREFIX),
    __metadata("design:paramtypes", [health_service_1.HealthService])
], HealthController);
//# sourceMappingURL=health.controller.js.map
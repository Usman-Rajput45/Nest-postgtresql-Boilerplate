"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const messages_constant_1 = require("../constants/messages.constant");
const status_codes_constant_1 = require("../constants/status-codes.constant");
const base_error_1 = require("../errors/base.error");
const validation_error_1 = require("../errors/validation.error");
const response_helper_1 = require("../helpers/response.helper");
const logger_util_1 = require("../utils/logger.util");
function extractHttpExceptionBody(exception) {
    const body = exception.getResponse();
    if (typeof body === 'string') {
        return { message: body };
    }
    return body;
}
let HttpErrorFilter = class HttpErrorFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof validation_error_1.AppValidationError) {
            response
                .status(exception.statusCode)
                .json((0, response_helper_1.buildErrorResponse)(exception.message, exception.statusCode, exception.details));
            return;
        }
        if (exception instanceof base_error_1.BaseError) {
            response
                .status(exception.statusCode)
                .json((0, response_helper_1.buildErrorResponse)(exception.message, exception.statusCode));
            return;
        }
        if (exception instanceof common_1.HttpException) {
            const statusCode = exception.getStatus();
            response
                .status(statusCode)
                .json((0, response_helper_1.buildErrorResponse)(exception.message, statusCode, extractHttpExceptionBody(exception)));
            return;
        }
        logger_util_1.logger.error(messages_constant_1.MESSAGES.GENERIC.INTERNAL_ERROR, exception);
        response
            .status(status_codes_constant_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json((0, response_helper_1.buildErrorResponse)(messages_constant_1.MESSAGES.GENERIC.INTERNAL_ERROR, status_codes_constant_1.STATUS_CODES.INTERNAL_SERVER_ERROR));
    }
};
exports.HttpErrorFilter = HttpErrorFilter;
exports.HttpErrorFilter = HttpErrorFilter = __decorate([
    (0, common_1.Catch)()
], HttpErrorFilter);
//# sourceMappingURL=error.middleware.js.map
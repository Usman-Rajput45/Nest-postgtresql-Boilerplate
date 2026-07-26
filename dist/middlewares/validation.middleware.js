"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlobalValidationPipe = createGlobalValidationPipe;
const common_1 = require("@nestjs/common");
const messages_constant_1 = require("../constants/messages.constant");
const status_codes_constant_1 = require("../constants/status-codes.constant");
const validation_error_1 = require("../errors/validation.error");
function mapValidationErrors(errors) {
    return errors;
}
function createGlobalValidationPipe() {
    return new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        exceptionFactory: (errors) => new validation_error_1.AppValidationError(messages_constant_1.MESSAGES.VALIDATION.FAILED, mapValidationErrors(errors), status_codes_constant_1.STATUS_CODES.BAD_REQUEST),
    });
}
//# sourceMappingURL=validation.middleware.js.map
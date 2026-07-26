"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppValidationError = void 0;
const messages_constant_1 = require("../constants/messages.constant");
const status_codes_constant_1 = require("../constants/status-codes.constant");
const base_error_1 = require("./base.error");
class AppValidationError extends base_error_1.BaseError {
    constructor(message = messages_constant_1.MESSAGES.VALIDATION.FAILED, details, statusCode = status_codes_constant_1.STATUS_CODES.BAD_REQUEST) {
        super(message, statusCode);
        this.details = details;
    }
}
exports.AppValidationError = AppValidationError;
//# sourceMappingURL=validation.error.js.map
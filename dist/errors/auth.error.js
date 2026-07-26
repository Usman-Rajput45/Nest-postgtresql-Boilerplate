"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const messages_constant_1 = require("../constants/messages.constant");
const status_codes_constant_1 = require("../constants/status-codes.constant");
const base_error_1 = require("./base.error");
class AuthError extends base_error_1.BaseError {
    constructor(message = messages_constant_1.MESSAGES.AUTH.UNAUTHORIZED, statusCode = status_codes_constant_1.STATUS_CODES.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=auth.error.js.map
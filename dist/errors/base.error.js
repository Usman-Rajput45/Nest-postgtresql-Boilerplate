"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const status_codes_constant_1 = require("../constants/status-codes.constant");
class BaseError extends Error {
    constructor(message, statusCode = status_codes_constant_1.STATUS_CODES.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base.error.js.map
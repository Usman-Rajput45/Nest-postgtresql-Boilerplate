"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuccessResponse = buildSuccessResponse;
exports.buildErrorResponse = buildErrorResponse;
exports.isApiResponse = isApiResponse;
function buildSuccessResponse(message, statusCode, data) {
    const body = {
        success: true,
        message,
        statusCode,
    };
    if (data !== undefined) {
        body.data = data;
    }
    return body;
}
function buildErrorResponse(message, statusCode, error) {
    const body = {
        success: false,
        message,
        statusCode,
    };
    if (error !== undefined) {
        body.error = error;
    }
    return body;
}
function isApiResponse(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const v = value;
    return typeof v.success === 'boolean' && typeof v.message === 'string';
}
//# sourceMappingURL=response.helper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jwt = require("jsonwebtoken");
const token_type_enum_1 = require("../enums/token-type.enum");
const auth_error_1 = require("../errors/auth.error");
const messages_constant_1 = require("../constants/messages.constant");
const status_codes_constant_1 = require("../constants/status-codes.constant");
function signAccessToken(payload, config) {
    const body = {
        ...payload,
        type: token_type_enum_1.TokenType.ACCESS,
    };
    const signOptions = {
        expiresIn: config.expiresIn,
        algorithm: 'HS256',
    };
    return jwt.sign(body, config.secret, signOptions);
}
function verifyAccessToken(token, config) {
    try {
        const decoded = jwt.verify(token, config.secret, {
            algorithms: ['HS256'],
        });
        if (typeof decoded === 'string' || decoded === null) {
            throw new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.INVALID_TOKEN, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED);
        }
        const record = decoded;
        if (record.type !== token_type_enum_1.TokenType.ACCESS) {
            throw new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.INVALID_TOKEN, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED);
        }
        return decoded;
    }
    catch (error) {
        if (error instanceof auth_error_1.AuthError) {
            throw error;
        }
        throw new auth_error_1.AuthError(messages_constant_1.MESSAGES.AUTH.INVALID_TOKEN, status_codes_constant_1.STATUS_CODES.UNAUTHORIZED);
    }
}
//# sourceMappingURL=jwt.util.js.map
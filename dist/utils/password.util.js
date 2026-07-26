"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt = require("bcrypt");
const security_constant_1 = require("../constants/security.constant");
async function hashPassword(plainText) {
    return bcrypt.hash(plainText, security_constant_1.SECURITY.BCRYPT_SALT_ROUNDS);
}
async function comparePassword(plainText, passwordHash) {
    return bcrypt.compare(plainText, passwordHash);
}
//# sourceMappingURL=password.util.js.map
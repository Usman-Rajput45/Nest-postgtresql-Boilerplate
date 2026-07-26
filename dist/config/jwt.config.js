"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildJwtEnvConfig = buildJwtEnvConfig;
function buildJwtEnvConfig(env) {
    return {
        secret: env.jwt.secret,
        expiresIn: env.jwt.expiresIn,
    };
}
//# sourceMappingURL=jwt.config.js.map
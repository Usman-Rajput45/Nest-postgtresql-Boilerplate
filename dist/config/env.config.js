"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvConfig = loadEnvConfig;
function readRequiredString(env, key) {
    const value = env[key];
    if (value === undefined || value.length === 0) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
function readOptionalInt(env, key, fallback) {
    const raw = env[key];
    if (raw === undefined || raw.length === 0) {
        return fallback;
    }
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
        return fallback;
    }
    return parsed;
}
function loadEnvConfig(env = process.env) {
    return {
        nodeEnv: env.NODE_ENV ?? 'development',
        port: readOptionalInt(env, 'PORT', 3000),
        db: {
            host: readRequiredString(env, 'DB_HOST'),
            port: readOptionalInt(env, 'DB_PORT', 5432),
            username: readRequiredString(env, 'DB_USER'),
            password: readRequiredString(env, 'DB_PASSWORD'),
            database: readRequiredString(env, 'DB_NAME'),
        },
        jwt: {
            secret: readRequiredString(env, 'JWT_SECRET'),
            expiresIn: readRequiredString(env, 'JWT_EXPIRES_IN'),
        },
        seed: {
            adminEmail: readRequiredString(env, 'SEED_ADMIN_EMAIL'),
            adminPassword: readRequiredString(env, 'SEED_ADMIN_PASSWORD'),
        },
    };
}
//# sourceMappingURL=env.config.js.map
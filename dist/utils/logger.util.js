"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function write(level, message, meta) {
    const prefix = `[${new Date().toISOString()}] [${level.toUpperCase()}]`;
    if (meta !== undefined) {
        console[level](prefix, message, meta);
        return;
    }
    console[level](prefix, message);
}
exports.logger = {
    log: (message, meta) => write('log', message, meta),
    error: (message, meta) => write('error', message, meta),
    warn: (message, meta) => write('warn', message, meta),
    debug: (message, meta) => write('debug', message, meta),
};
//# sourceMappingURL=logger.util.js.map
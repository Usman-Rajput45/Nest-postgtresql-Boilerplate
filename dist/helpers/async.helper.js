"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asAsync = asAsync;
function asAsync(fn) {
    return (...args) => fn(...args);
}
//# sourceMappingURL=async.helper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_1 = require("./app");
const injection_tokens_1 = require("./config/injection-tokens");
const error_middleware_1 = require("./middlewares/error.middleware");
const validation_middleware_1 = require("./middlewares/validation.middleware");
const logger_util_1 = require("./utils/logger.util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_1.AppModule);
    app.useGlobalFilters(new error_middleware_1.HttpErrorFilter());
    app.useGlobalPipes((0, validation_middleware_1.createGlobalValidationPipe)());
    const env = app.get(injection_tokens_1.APP_ENV);
    await app.listen(env.port);
    logger_util_1.logger.log(`HTTP server listening on port ${env.port}`);
}
void bootstrap();
//# sourceMappingURL=server.js.map
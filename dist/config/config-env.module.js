"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigEnvModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const injection_tokens_1 = require("./injection-tokens");
const env_config_1 = require("./env.config");
const jwt_config_1 = require("./jwt.config");
let ConfigEnvModule = class ConfigEnvModule {
};
exports.ConfigEnvModule = ConfigEnvModule;
exports.ConfigEnvModule = ConfigEnvModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
            }),
        ],
        providers: [
            {
                provide: injection_tokens_1.APP_ENV,
                useFactory: () => (0, env_config_1.loadEnvConfig)(),
            },
            {
                provide: injection_tokens_1.JWT_ENV,
                useFactory: (env) => (0, jwt_config_1.buildJwtEnvConfig)(env),
                inject: [injection_tokens_1.APP_ENV],
            },
        ],
        exports: [injection_tokens_1.APP_ENV, injection_tokens_1.JWT_ENV],
    })
], ConfigEnvModule);
//# sourceMappingURL=config-env.module.js.map
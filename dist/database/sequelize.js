"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSequelizeModuleOptions = buildSequelizeModuleOptions;
const user_model_1 = require("./models/user.model");
function buildSequelizeModuleOptions(env) {
    return {
        dialect: 'postgres',
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        models: [user_model_1.User],
        autoLoadModels: true,
        logging: env.nodeEnv === 'development' ? console.log : false,
        define: {
            underscored: true,
            timestamps: true,
        },
    };
}
//# sourceMappingURL=sequelize.js.map
"use strict";
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dialect = 'postgres';
function buildEnv() {
    return {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT ?? '5432', 10),
        dialect,
    };
}
module.exports = {
    development: buildEnv(),
    test: buildEnv(),
    production: buildEnv(),
};
//# sourceMappingURL=sequelize-cli.config.js.map
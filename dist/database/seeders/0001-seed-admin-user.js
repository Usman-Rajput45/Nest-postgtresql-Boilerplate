"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const sequelize_1 = require("sequelize");
const role_enum_1 = require("../../enums/role.enum");
const password_util_1 = require("../../utils/password.util");
module.exports = {
    async up(queryInterface) {
        const emailRaw = process.env.SEED_ADMIN_EMAIL;
        const passwordRaw = process.env.SEED_ADMIN_PASSWORD;
        if (emailRaw === undefined || passwordRaw === undefined) {
            throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set');
        }
        const email = emailRaw.trim().toLowerCase();
        const rows = await queryInterface.sequelize.query('SELECT id FROM users WHERE email = :email LIMIT 1', {
            replacements: { email },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (rows.length > 0) {
            return;
        }
        const passwordHash = await (0, password_util_1.hashPassword)(passwordRaw);
        const now = new Date();
        await queryInterface.bulkInsert('users', [
            {
                id: (0, crypto_1.randomUUID)(),
                email,
                password: passwordHash,
                role: role_enum_1.Role.ADMIN,
                created_at: now,
                updated_at: now,
            },
        ]);
    },
    async down(queryInterface) {
        const emailRaw = process.env.SEED_ADMIN_EMAIL;
        if (emailRaw === undefined) {
            return;
        }
        const email = emailRaw.trim().toLowerCase();
        await queryInterface.sequelize.query('DELETE FROM users WHERE email = :email', {
            replacements: { email },
        });
    },
};
//# sourceMappingURL=0001-seed-admin-user.js.map
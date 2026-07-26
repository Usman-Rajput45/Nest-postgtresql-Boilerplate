import { randomUUID } from 'crypto';
import type { QueryInterface } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Role } from '../../enums/role.enum';
import { hashPassword } from '../../utils/password.util';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    const emailRaw = process.env.SEED_ADMIN_EMAIL;
    const passwordRaw = process.env.SEED_ADMIN_PASSWORD;
    if (emailRaw === undefined || passwordRaw === undefined) {
      throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set');
    }
    const email = emailRaw.trim().toLowerCase();
    const rows = await queryInterface.sequelize.query<{ id: string }>(
      'SELECT id FROM users WHERE email = :email LIMIT 1',
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      },
    );
    if (rows.length > 0) {
      return;
    }
    const passwordHash = await hashPassword(passwordRaw);
    const now = new Date();
    await queryInterface.bulkInsert('users', [
      {
        id: randomUUID(),
        email,
        password: passwordHash,
        role: Role.ADMIN,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
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

/**
 * Database-related configuration helpers.
 * Runtime Sequelize options are assembled in `database/sequelize.ts`.
 */
export const DB_CONSTANTS = {
  DIALECT: 'postgres' as const,
} as const;

import { config as loadEnv } from 'dotenv';

loadEnv();

const dialect = 'postgres' as const;

function buildEnv() {
  return {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: Number.parseInt(process.env.DB_PORT ?? '5432', 10),
    dialect,
  };
}

export = {
  development: buildEnv(),
  test: buildEnv(),
  production: buildEnv(),
};

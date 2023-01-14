import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export default {
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
};

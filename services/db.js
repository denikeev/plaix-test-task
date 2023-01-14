import { Pool } from 'pg';
import dbConfig from './db.config.js';

const pool = new Pool(dbConfig);

export const query = async (queryText, values) => {
  const { rows } = await pool.query(queryText, values);
  return rows;
};

export default pool;

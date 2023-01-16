import pool from './dbPool.js';

export default async (queryText, values) => {
  const { rows } = await pool.query(queryText, values);
  return rows;
};

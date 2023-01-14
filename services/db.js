import pkg from 'pg';
import dbConfig from './db.config.js';

const { Pool } = pkg;

const poolInstance = new Pool(dbConfig);

export const query = async (queryText, values) => {
  const { rows } = await poolInstance.query(queryText, values);
  return rows;
};

export default poolInstance;

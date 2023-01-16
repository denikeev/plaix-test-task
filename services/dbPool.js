import pkg from 'pg';
import dbConfig from './db.config.js';

const { Pool } = pkg;

export default new Pool(dbConfig);

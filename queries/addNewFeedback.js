import format from 'pg-format';
import { query } from '../services/db.js';

const addNewFeedback = async (data) => {
  const date = new Date();
  const time = date.toISOString();
  const { name, body, email } = data;
  const values = [name, body, email.toLowerCase(), time];
  const sql = format('INSERT INTO feedback (name, body, email, created_at) VALUES (%L) RETURNING *', values);

  console.log('formatedSql>>>', sql);
  const response = await query(sql);
  console.log('responseRows>>>', response);
};

export default addNewFeedback;

import format from 'pg-format';
import query from '../services/query.js';
import log from '../log.js';

const addNewFeedback = async (data) => {
  const date = new Date();
  const time = date.toISOString();
  const { name, body, email } = data;
  const values = [name, body, email.toLowerCase(), time];
  const sql = format('INSERT INTO feedback (name, body, email, created_at) VALUES (%L) RETURNING *', values);

  log(`Formatted SQL: ${sql}`);
  const [addedRow] = await query(sql);
  log(`Added row in db: ${JSON.stringify(addedRow)}`);
  return addedRow;
};

export default addNewFeedback;

import format from 'pg-format';
import { query } from '../services/db.js';

const addNewFeedback = async (req, res) => {
  try {
    console.log('req.body>>>', req.body);

    const date = new Date();
    const time = date.toISOString();
    const { name, body, email } = req.body;
    const values = [name, body, email, time];
    const sql = format('INSERT INTO feedback (name, body, email, created_at) VALUES (%L) RETURNING *', values);

    console.log('formatedSql>>>', sql);
    const response = await query(sql);
    console.log('responseRows>>>', response);
    res.status(200);
    res.send('all okey');
  } catch (err) {
    console.log('err>>>', err);
  }
};

export default addNewFeedback;

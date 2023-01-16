import query from '../services/query.js';

const sql = `
CREATE TABLE IF NOT EXISTS feedback (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  body VARCHAR(1300) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);`;

export default async () => query(sql);

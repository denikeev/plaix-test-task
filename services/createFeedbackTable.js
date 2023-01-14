import { query } from './db.js';

const queryText = `CREATE TABLE feedback (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(70) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  email VARCHAR(70) NOT NULL,
  created_at TIMESTAMP NOT NULL
);`;

export default async () => query(queryText);

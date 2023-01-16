import request from 'supertest';
import app from '../index.js';

import pool from '../services/dbPool.js';

test('GET 200', async () => {
  const res = await request(app()).get('/');
  expect(res.status).toBe(200);
});

test('GET 404', async () => {
  const res = await request(app()).get('/wrong');
  expect(res.status).toBe(404);
});

afterAll(async () => {
  await pool.end();
});

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import createFeedbackTable from './services/createFeedbackTable.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await createFeedbackTable();

export default () => {
  const app = express();
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.post('/api/v1/feedback', (req, res) => {
    console.log('originalUrl>>>', req.originalUrl);
    console.log('req.body>>>', req.body);
    res.status(200);
    res.send('all okey');
  });

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
  return app;
};

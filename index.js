import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import log from './log.js';
import createFeedbackTable from './queries/createFeedbackTable.js';
import feedbackRoute from './routes/feedbackRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await createFeedbackTable();
log('Table feedback is ready');

export default () => {
  const app = express();
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.use('/', feedbackRoute);

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  return app;
};

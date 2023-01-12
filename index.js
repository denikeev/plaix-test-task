import Express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Express();
const logger = morgan('combined');
app.use(logger);

app.use(Express.static(path.join(__dirname, '/frontend/build')));

// app.get(routes.root, (req, res) => {
//   res.send('Hello World!');
// });

app.post(routes.feedback, (req, res) => {
  console.log('req>>>', req);
  res.status(200);
  res.send('all okey');
});

export default app;

import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import log from '../log.js';
import routes from './routes.js';
import addNewFeedback from '../queries/addNewFeedback.js';

const feedbackRoute = Router();

feedbackRoute.post(
  routes.feedbackPath(),
  body('name').isLength({ min: 1, max: 70 }).trim(),
  body('email').isEmail().trim(),
  body('body').isLength({ min: 1, max: 1000 }).trim(),
  async (req, res) => {
    log(`Request body ${JSON.stringify(req.body)}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await addNewFeedback(req.body);
    return res.status(200).send('request received');
  },
);

export default feedbackRoute;

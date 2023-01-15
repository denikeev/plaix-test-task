import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import addNewFeedback from '../queries/addNewFeedback.js';

const router = Router();

router.post(
  '/api/v1/feedback',
  body('name').isLength({ min: 1, max: 70 }).trim(),
  body('email').isEmail().trim(),
  body('body').isLength({ min: 1, max: 1000 }).trim(),
  (req, res) => {
    console.log('req.body>>>', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    addNewFeedback(req.body);
    res.status(200);
    return res.send('all okey');
  },
);

export default router;

#!/usr/bin/env node

import app from '../index.js';

const port = process.env.PORT || 5001;

app().listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

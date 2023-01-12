#!/usr/bin/env node

import app from '../index.js';

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

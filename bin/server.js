#!/usr/bin/env node

import server from '../index.js';

const port = process.env.PORT || 5001;
const app = server();

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

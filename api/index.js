const express = require('express');
const app = express();
module.exports = { path: '/api', handler: app };

app.get('/hello', (req, res) => {
  console.log('hello nuxt in text');
  res.send('world');
});

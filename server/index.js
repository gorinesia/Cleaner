const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const apiRouter = require('./api');

app.set('port', port);

let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

async function start() {
  app.use('/api', apiRouter);

  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render);

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
};
start();

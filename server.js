const express = require('express');
const next = require('next');

const styleguide = require('./api/styleguide');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use('/api/styleguide', styleguide);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, error => {
      if (error) throw error;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

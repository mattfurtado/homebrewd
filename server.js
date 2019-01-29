const express = require('express');
const fs = require('fs');
const next = require('next');
const xmlParser = require('xml2json');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/api/styles', (req, res) => {
      fs.readFile('./static/bjcp-styleguide.xml', (error, data) => {
        if (error) throw error;
        res.send(xmlParser.toJson(data));
      });
    });

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

const express = require('express');
const graphqlHttp = require('express-graphql');
const next = require('next');

const styleguide = require('./api/styleguide');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      '/graphql',
      graphqlHttp({
        schema,
        rootValue: resolvers,
        graphiql: true,
      })
    );

    server.use('/api/styleguide', styleguide);

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, error => {
      if (error) throw error;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

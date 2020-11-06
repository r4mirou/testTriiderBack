import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import db from './src/database/models';
import RequestedFields from './src/graphql/ast/requestedFields';
import schema from './src/middlewares';
import extractJwtMiddleware from './src/middlewares/extractor-jwt.middleware';

export default class Server {
  constructor() {
    this.server = express();
    this.requestedFields = new RequestedFields();
  }

  startup(port) {
    this.server.use(cors({
      origin: '*',
      methods: ['Get', 'Post'],
      allowedHeaders: ['Content-type', 'Authorization', 'Accepet-Enconding'],
      preflightContinue: false,
      optionsSuccessStatus: 200,
    }));
    this.server.use('/graphql',

      (req, res, next) => {
        req.context = { };
        next();
      },

      extractJwtMiddleware(),

      (req, res, next) => {
        req.context.db = db;
        req.context.requestedFields = this.requestedFields;
        next();
      },
      graphqlHTTP((req) => ({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: req.context,
        customFormatErrorFn: (err) => ({
          name: !!err.name ? err.name : '',
          message: !!err.message ? err.message : '',
          status: !!err.originalError ? err.originalError.code : 500,
          path: !!err.path ? err.path[0] : '',
        }),
      })));
    this.server.listen(port, () => console.log(`Listening in: localhost:${port}/graphql`));
  }
}

import { applyMiddleware } from 'graphql-middleware';
import schema from '../graphql/schema';
import authenticator from './authenticator.middleware';
import logger from './logger.middleware';

let middlewares;

if (process.env.NODE_ENV === 'test') {
  middlewares = [authenticator];
} else {
  middlewares = [logger, authenticator];
}

export default applyMiddleware(schema, ...middlewares);

import * as jwt from 'jsonwebtoken';
import throwError from '../utils/handleError';

const notAuthenticate = ['createToken', 'createUser'];

const authentication = async (resolve, parent, args, context, info) => {
  if (!notAuthenticate.includes(info.fieldName)) {
    if (context.token) {
      jwt.verify(context.token, process.env.JWT_ENV,
        (err) => throwError(err, 401, 'Unauthorized! Invalid token.'));

      if (!context.authUser) {
        throwError(true, 401, 'Unauthorized! User token not found.');
      }
    } else { throwError(true, 401, 'Unauthorized! Token not provided.'); }
  }

  return resolve(parent, args, context, info);
};

const authenticatorMiddleware = {
  Query: authentication,
  Mutation: authentication,
  // Subscription: authentication,
};

export default authenticatorMiddleware;

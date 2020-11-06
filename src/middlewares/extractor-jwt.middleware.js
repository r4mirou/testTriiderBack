import * as jwt from 'jsonwebtoken';
import db from '../database/models';

export default () => (req, res, next) => { // eslint-disable-line
  const authorization = req.get('authorization');
  const token = authorization ? authorization.split(' ')[1] : undefined;
  req.context.token = token;

  if (!token) return next();

  jwt.verify(token, process.env.JWT_ENV, (err, decoded) => { // eslint-disable-line
    if (err) return next();

    db.User.findOne({
      where: { id: decoded.sub },
      attributes: ['id', 'email', 'username'],
    }).then((user) => {
      if (user) {
        req.context.authUser = {
          id: user.get('id'),
          email: user.get('email'),
          username: user.get('username'),
        };
      }
      return next();
    });
  });
};

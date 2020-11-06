import * as jwt from 'jsonwebtoken';
import throwError from '../../../utils/handleError';

export default {
  Mutation: {
    createToken: ((parent, args, context) => context.db.sequelize.query(
      `SELECT id, password
      FROM "Users"
      WHERE "Users"."email" = $1
      OR "Users"."username" = $1`,
      {
        bind: [args.login],
        model: context.db.User,
      },
    ).then((userEntry) => {
      const user = userEntry[0];
      if (!user || !user.isPassword(args.password, user.get('password'))) {
        throwError(true, 401, 'Unauthorized, wrong email/username or password!');
      }

      const payload = { sub: user.get('id') };

      return {
        token: jwt.sign(payload, process.env.JWT_ENV),
      };
    }).catch((err) => {
      throwError(true, err.code, err.code === 401 ? err.message : 'Internal error! At user getting.');
    })),
  },
};

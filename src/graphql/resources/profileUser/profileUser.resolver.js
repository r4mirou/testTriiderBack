import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';
import {
  dateNowUTC,
  formatSaveData,
} from '../../../utils/handleDate';

export default {
  ProfileUser: {
    fk_user: async (profileUser, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "Users" 
          WHERE "Users"."id" = $1`,
          {
            bind: [profileUser.get('fk_user')],
            model: context.db.User,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At user getting.'); }
    },
  },

  Query: {
    currentProfileUser: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "ProfileUsers"
          WHERE "ProfileUsers"."fk_user" = $1`,
          {
            bind: [context.authUser.id],
            model: context.db.ProfileUser,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At ProfileUser getting.'); }
    },
  },

  Mutation: {
    updateCurrentProfileUser: async (parent, args, context, info) => {
      try {
        const date = formatSaveData(dateNowUTC);
        const [profileId] = await context.db.sequelize.query(
          'SELECT "id" FROM "ProfileUsers" WHERE "ProfileUsers"."fk_user" = $1',
          { bind: [context.authUser.id], model: context.db.ProfileUser },
        );

        await context.db.sequelize.query(
          `UPDATE "ProfileUsers"
           SET "name"=$1,"about"=$2,"updatedAt"=$3 
           WHERE "id" = $4`,
          {
            bind: [`${args.input.name}`, `${args.input.about}`, `${date}`, `${profileId.id}`],
            type: context.db.sequelize.QueryTypes.UPDATE,
          },
        );

        const [outProfile] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "ProfileUsers"
           WHERE "ProfileUsers"."fk_user" = $1`,
          {
            bind: [context.authUser.id],
            model: context.db.ProfileUser,
          },
        );

        return outProfile;
      } catch (err) { throwError(true, 500, 'Internal error! At ProfileUser update.'); }
    },
  },
};

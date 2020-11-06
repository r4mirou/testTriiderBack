import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';

export default {

  RoleUser: {
    fk_user: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "Users" 
          WHERE "Users"."id" = $1`,
          {
            bind: [parent.get('fk_user')],
            model: context.db.User,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At user getting.'); }
    },

    fk_role_type: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "RoleTypes" AS "RoleType"
          WHERE "RoleType"."id" = $1`,
          {
            bind: [parent.get('fk_role_type')],
            model: context.db.RoleType,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At roleType getting.'); }
    },
  },

  Query: {
    currentAllRoleUser: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "RoleUsers" AS "RoleUser"
           WHERE "RoleUser"."fk_user" = $1`,
          {
            bind: [context.authUser.id],
            model: context.db.RoleUser,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At roleUser getting.'); }
    },
  },
};

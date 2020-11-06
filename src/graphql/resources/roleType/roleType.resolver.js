import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';

export default {
  Query: {

    allRoleType: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "RoleTypes" AS "RoleType"`,
          { model: context.db.RoleType },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At roleType getting.'); }
    },

    roleType: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "RoleTypes" 
          WHERE "RoleTypes"."id" = $1`,
          {
            bind: [args.id],
            model: context.db.RoleType,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At roleType getting.'); }
    },
  },
};

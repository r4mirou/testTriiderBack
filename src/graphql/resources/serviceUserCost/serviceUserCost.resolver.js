import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';

export default {
  ServiceUserCost: {

    fk_service_user: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "ServiceUsers"
          WHERE "ServiceUsers"."id" = $1`,
          {
            bind: [parent.get('fk_service_user')],
            model: context.db.ServiceUser,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceUser getting.'); }
    },
  },

  Query: {

    serviceUserCostByService: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "ServiceUserCosts"
           WHERE "ServiceUserCosts"."fk_service_user" = $1`,
          {
            bind: [args.id],
            model: context.db.ServiceUserCost,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceUserCost getting.'); }
    },
  },
};

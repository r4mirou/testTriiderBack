import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';

export default {
  Query: {

    allServiceType: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "ServiceTypes"`,
          { model: context.db.ServiceType },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceType getting.'); }
    },

    serviceType: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "ServiceTypes" 
          WHERE "ServiceTypes"."id" = $1`,
          {
            bind: [args.id],
            model: context.db.ServiceType,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceType getting.'); }
    },
  },
};

import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';

export default {

  ServiceUser: {

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

    fk_service_type: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "ServiceTypes"
          WHERE "ServiceTypes"."id" = $1`,
          {
            bind: [parent.get('fk_service_type')],
            model: context.db.ServiceType,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceType getting.'); }
    },

    serviceUserCost: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "ServiceUserCosts"
           WHERE "ServiceUserCosts"."fk_service_user" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.ServiceUserCost,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceUserCost getting.'); }
    },
  },

  Query: {
    currentAllServiceUser: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "ServiceUsers"
           WHERE "ServiceUsers"."fk_user" = $1`,
          {
            bind: [context.authUser.id],
            model: context.db.ServiceUser,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceUser getting.'); }
    },

    allServiceUserByService: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "ServiceUsers"
           WHERE "ServiceUsers"."fk_service_type" = $1`,
          {
            bind: [args.id],
            model: context.db.ServiceUser,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceUser getting.'); }
    },
  },
};

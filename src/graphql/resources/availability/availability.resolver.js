import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';

export default {

  Availability: {
    fk_calendar: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "Calendars" 
          WHERE "Calendars"."id" = $1`,
          {
            bind: [parent.get('fk_calendar')],
            model: context.db.Calendar,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At calendar getting.'); }
    },

    binary: async (parent, args, context) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT *
          FROM "Availabilities" 
          WHERE "Availabilities"."id" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.Availability,
          },
        );
        const binary = `${result.get('sunday') ? 1 : 0}${result.get('monday') ? 1 : 0}${result.get('tuesday') ? 1 : 0}${result.get('wednesday') ? 1 : 0}${result.get('thursday') ? 1 : 0}${result.get('friday') ? 1 : 0}${result.get('saturday') ? 1 : 0}${result.get('morning') ? 1 : 0}${result.get('afternoon') ? 1 : 0}${result.get('night') ? 1 : 0}`;

        return binary;
      } catch (err) { throwError(true, 500, 'Internal error! At calendar getting.'); }
    },

  },

  Query: {
    availabilities: async (parent, args, context, info) => {
      try {
        const [currentCalendarId] = await context.db.sequelize.query(
          'SELECT id FROM "Calendars" WHERE "Calendars"."fk_user" = $1',
          {
            bind: [context.authUser.id],
            model: context.db.Availability,
          },
        );

        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "Availabilities"
           WHERE "Availabilities"."fk_calendar" = $1`,
          {
            bind: [currentCalendarId.id],
            model: context.db.Availability,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At availabilities getting.'); }
    },
  },
};

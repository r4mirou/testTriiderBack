import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';

export default {

  Calendar: {

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

    events: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "Events" 
          WHERE "Events"."fk_calendar" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.Event,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At event getting.'); }
    },

    availabilities: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
          FROM "Availabilities" 
          WHERE "Availabilities"."fk_calendar" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.Availability,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At availabilities getting.'); }
    },

  },

  Query: {
    allCalendarByCurrentUser: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "Calendars"
           WHERE "Calendars"."fk_user" = $1`,
          {
            bind: [context.authUser.id],
            model: context.db.Calendar,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At calendars getting.'); }
    },
  },
};

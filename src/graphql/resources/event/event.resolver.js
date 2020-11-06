import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';
import { nameDayWeek, nameTurnDay } from '../../../utils/handleDate';

export default {

  Event: {
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

  },

  Query: {
    events: async (parent, args, context, info) => {
      try {
        const [currentCalendarId] = await context.db.sequelize.query(
          'SELECT id FROM "Calendars" WHERE "Calendars"."fk_user" = $1',
          {
            bind: [context.authUser.id],
            model: context.db.Event,
          },
        );

        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "Events"
           WHERE "Events"."fk_calendar" = $1
           AND    date_event   <= $2::date
           AND    date_event   >= $3::date
           ORDER BY "block_event" desc, "createdAt" desc

           `,
          {
            bind: [currentCalendarId.id, args.final, args.initial],
            model: context.db.Event,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At event getting.'); }
    },
  },

  Mutation: {
    createEvent: async (parent, args, context) => {
      if (args.input.block) {
        const block = await context.db.sequelize.query(
          `SELECT * FROM "Events" WHERE date_event = $1::date
            AND Block_event = TRUE AND period = $2
          `,
          {
            bind: [args.input.date, args.input.period],
            model: context.db.Event,
          },
        );
        throwError(!!block.length, 403, 'Horário ocupado!');
      }

      const [currentCalendarId] = await context.db.sequelize.query(
        'SELECT id FROM "Calendars" WHERE "Calendars"."fk_user" = $1',
        {
          bind: [context.authUser.id],
          model: context.db.Calendar,
        },
      );

      const dateNow = new Date();
      const date = new Date(args.input.date);
      const dayWeek = date.getDay();
      const nameDay = nameDayWeek(dayWeek);
      const nameTurn = nameTurnDay(args.input.period);

      const [availabilities] = await context.db.sequelize.query(
        'SELECT * FROM "Availabilities" WHERE fk_calendar = $1',
        {
          bind: [currentCalendarId.id],
          model: context.db.Availability,
        },
      );
      throwError(!(availabilities[nameDay] && availabilities[nameTurn]), 403, 'Horário indisponível!');

      const [insertId] = await context.db.sequelize.query(
        `INSERT INTO "Events" 
        ("name","date_event","local_event","day_week","period","block_event","fk_calendar", "createdAt","updatedAt")
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$8) RETURNING "id";`,
        {
          bind: [args.input.name,
            date,
            args.input.local,
            dayWeek,
            args.input.period,
            args.input.block,
            currentCalendarId.id,
            dateNow,
          ],
          model: context.db.Event,
        },
      );

      const [inserted] = await context.db.sequelize.query(
        'SELECT * FROM "Events" WHERE id = $1',
        {
          bind: [insertId.id],
          model: context.db.Event,
        },
      );
      return inserted;
    },
  },
};

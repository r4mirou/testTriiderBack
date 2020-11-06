import throwError from '../../../utils/handleError';
import { excludeList, keepList } from '../../../utils/normalizeRequestedFields';
import {
  dateNowUTC,
  formatSaveData,
} from '../../../utils/handleDate';

export default {
  User: {

    profileUser: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "ProfileUsers"
           WHERE "ProfileUsers"."fk_user" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.ProfileUser,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At user getting.'); }
    },

    roleUser: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "RoleUsers"
           WHERE "RoleUsers"."fk_user" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.RoleUser,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At roleUser getting.'); }
    },

    serviceUser: async (parent, args, context, info) => {
      try {
        const result = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "ServiceUsers"
           WHERE "ServiceUsers"."fk_user" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.ServiceUser,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At serviceUser getting.'); }
    },

    calendar: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "Calendars"
           WHERE "Calendars"."fk_user" = $1`,
          {
            bind: [parent.get('id')],
            model: context.db.Calendar,
          },
        );

        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At calendar getting.'); }
    },
  },

  Query: {
    currentUser: async (parent, args, context, info) => {
      try {
        const [result] = await context.db.sequelize.query(
          `SELECT ${context.requestedFields.getFields(info, { keep: keepList, exclude: excludeList })}
           FROM "Users" 
           WHERE "Users"."id" = $1`,
          {
            bind: [context.authUser.id],
            model: context.db.User,
          },
        );
        return result;
      } catch (err) { throwError(true, 500, 'Internal error! At user getting.'); }
    },
  },

  Mutation: {
    // create user, profileUser and roleUsers
    createUser: async (parent, args, context) => {
      try {
        const result = await context.db.sequelize.transaction(async (t) => {
          const date = formatSaveData(dateNowUTC);
          const [userId] = await context.db.sequelize.query(
            `INSERT INTO "Users" ("id", "username", "password", "email", "createdAt", "updatedAt")
             VALUES (DEFAULT, $1, $2, $3, $4, $4) RETURNING "id";`,
            {
              bind: [`${args.input.username}`, `${args.input.password}`, `${args.input.email}`, `${date}`],
              type: context.db.sequelize.QueryTypes.INSERT,
              plain: true,
            }, { transaction: t },
          );

          const [user] = await context.db.sequelize.query(
            'SELECT * FROM "Users" WHERE "Users"."id" = $1',
            { bind: [userId.id], model: context.db.User },
          );

          await context.db.sequelize.query(
            `INSERT INTO "ProfileUsers" ("id","fk_user","name","about","createdAt", "updatedAt")
             VALUES (DEFAULT, $1, $2, $3, $4, $4)`,
            {
              bind: [`${user.id}`, `${user.username}`, `${user.username}`, `${date}`],
              plain: true,
            }, { transaction: t },
          );

          await context.db.sequelize.query(
            `INSERT INTO "RoleUsers" ("id","fk_user","fk_role_type", "createdAt", "updatedAt")
             VALUES (DEFAULT, $1, $2, $3, $3)`,
            {
              bind: [`${user.id}`, `${args.input.roleUser}`, `${date}`],
              plain: true,
            }, { transaction: t },
          );
          return user;
        });
        return result;
      } catch (err) { throwError(err, 500, 'Internal error! At user creation.'); }
    },

    updateCurrentUser: async (parent, args, context) => {
      try {
        const date = formatSaveData(dateNowUTC);
        await context.db.sequelize.query(
          `UPDATE "Users" 
           SET "username"=$1,"email"=$2,"updatedAt"=$3 
           WHERE "id" = $4`,
          {
            bind: [`${args.input.username}`, `${args.input.email}`, `${date}`, `${context.authUser.id}`],
            type: context.db.sequelize.QueryTypes.INSERT,
          },
        );

        const [user] = await context.db.sequelize.query(
          'SELECT * FROM "Users" AS "User" WHERE "User"."id" = $1',
          { bind: [context.authUser.id], model: context.db.User },
        );

        return user;
      } catch (err) { throwError(true, 500, 'Internal error! At user update.'); }
    },

    updateCurrentUserPassword: async (parent, args, context, info) => { // eslint-disable-line
      try {
        const date = formatSaveData(dateNowUTC);
        const [result] = await context.db.sequelize.query(
          `UPDATE "Users" 
           SET "password"=$1,"updatedAt"=$2 
           WHERE "id" = $3 RETURNING "id";`,
          {
            bind: [`${args.input.password}`, `${date}`, `${context.authUser.id}`],
            type: context.db.sequelize.QueryTypes.INSERT,
            plain: true,
          },
        );

        return (result.id === context.authUser.id);
      } catch (err) { throwError(true, 500, 'Internal error! At password update.'); }
    },

    deleteCurrentUser: async (parent, args, context) => {
      try {
        return await context.db.sequelize.transaction(async (t) => {
          const [profileUser] = await context.db.sequelize.query(
            'SELECT * FROM "ProfileUsers" WHERE "ProfileUsers"."fk_user" = $1',
            { bind: [context.authUser.id], model: context.db.ProfileUser },
            { transaction: t },
          );

          await context.db.sequelize.query(
            'DELETE FROM "ProfileUsers" WHERE "ProfileUsers"."id" = $1',
            { bind: [profileUser.id], model: context.db.ProfileUser },
            { transaction: t },
          );

          const [roleUser] = await context.db.sequelize.query(
            'SELECT * FROM "RoleUsers" WHERE "RoleUsers"."fk_user" = $1',
            { bind: [context.authUser.id], model: context.db.RoleUser },
            { transaction: t },
          );

          await context.db.sequelize.query(
            'DELETE FROM "RoleUsers" WHERE "RoleUsers"."id" = $1',
            { bind: [roleUser.id], model: context.db.RoleUser },
            { transaction: t },
          );

          await context.db.sequelize.query(
            'DELETE FROM "Users" WHERE "Users"."id" = $1',
            { bind: [context.authUser.id], model: context.db.User },
            { transaction: t },
          );

          return true;
        });
      } catch (err) {
        throwError(true, 500, 'Internal error! At user delete.');
      }
    },
  },
};

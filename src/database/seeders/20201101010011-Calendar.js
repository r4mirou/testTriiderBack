module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Calendars',
      [
        {
          fk_user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_user: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface) => queryInterface.bulkDelete('Calendars', null, {}),
};

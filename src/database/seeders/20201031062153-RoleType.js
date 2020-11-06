module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('RoleTypes',
      [
        {
          type: 1,
          description: 'Animador',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 2,
          description: 'Cliente',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface) => queryInterface.bulkDelete('RoleTypes', null, {}),
};

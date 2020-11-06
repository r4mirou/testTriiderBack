module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ServiceTypes',
      [
        {
          type: 1,
          description: 'Palhaço',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 2,
          description: 'Mágico',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 2,
          description: 'Malabarista',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface) => queryInterface.bulkDelete('ServiceTypes', null, {}),
};

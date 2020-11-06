module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ServiceUserCosts',
      [
        {
          fk_service_user: 1,
          cost: 100.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 2,
          cost: 120.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 3,
          cost: 150.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 4,
          cost: 110.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 5,
          cost: 180.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 6,
          cost: 199.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 7,
          cost: 91.90,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 8,
          cost: 135,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 9,
          cost: 120.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fk_service_user: 10,
          cost: 115.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface) => queryInterface.bulkDelete('ServiceUserCosts', null, {}),
};

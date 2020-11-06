module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ServiceUserCosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fk_service_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cost: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ServiceUserCosts');
  },
};

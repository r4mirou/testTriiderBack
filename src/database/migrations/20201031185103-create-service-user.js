module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ServiceUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fk_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fk_service_type: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('ServiceUsers');
  },
};

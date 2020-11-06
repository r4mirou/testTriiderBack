module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Availabilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sunday: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      monday: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      tuesday: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      wednesday: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      thursday: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      friday: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      saturday: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      morning: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      afternoon: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      night: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      fk_calendar: {
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
    await queryInterface.dropTable('Availabilities');
  },
};

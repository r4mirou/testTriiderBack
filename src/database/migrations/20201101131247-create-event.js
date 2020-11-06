module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date_event: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      local_event: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      block_event: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      day_week: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      period: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Events');
  },
};

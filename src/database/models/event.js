import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Calendar, {
        foreignKey: 'fk_calendar',
        as: 'fk_calendar',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  Event.init({
    name: DataTypes.STRING,
    date_event: DataTypes.DATE,
    local_event: DataTypes.TEXT,
    block_event: DataTypes.BOOLEAN,
    day_week: DataTypes.INTEGER,
    period: DataTypes.INTEGER,
    fk_calendar: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'Events',
    freezeTableName: true,
  });
  return Event;
};

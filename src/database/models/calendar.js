import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Calendar extends Model {
    static associate(models) {
      Calendar.belongsTo(models.User, {
        foreignKey: 'fk_user',
        as: 'fk_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      Calendar.hasOne(models.Event, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      Calendar.hasOne(models.Availability, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  Calendar.init({
    fk_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Calendar',
    tableName: 'Calendars',
    freezeTableName: true,
  });
  return Calendar;
};

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Availability extends Model {
    static associate(models) {
      Availability.belongsTo(models.Calendar, {
        foreignKey: 'fk_calendar',
        as: 'fk_calendar',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  Availability.init({
    sunday: DataTypes.BOOLEAN,
    monday: DataTypes.BOOLEAN,
    tuesday: DataTypes.BOOLEAN,
    wednesday: DataTypes.BOOLEAN,
    thursday: DataTypes.BOOLEAN,
    friday: DataTypes.BOOLEAN,
    saturday: DataTypes.BOOLEAN,
    morning: DataTypes.BOOLEAN,
    afternoon: DataTypes.BOOLEAN,
    night: DataTypes.BOOLEAN,
    fk_calendar: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Availability',
    tableName: 'Availabilities',
    freezeTableName: true,
  });
  return Availability;
};

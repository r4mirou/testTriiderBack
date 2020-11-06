import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RoleType extends Model {
    static associate(models) {
      RoleType.hasOne(models.RoleUser, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  RoleType.init({
    type: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'RoleType',
    tableName: 'RoleTypes',
    freezeTableName: true,
  });
  return RoleType;
};

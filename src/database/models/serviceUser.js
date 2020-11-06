import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ServiceUser extends Model {
    static associate(models) {
      ServiceUser.belongsTo(models.User, {
        foreignKey: 'fk_user',
        as: 'fk_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      ServiceUser.belongsTo(models.ServiceType, {
        foreignKey: 'fk_service_type',
        as: 'fk_service_type',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      ServiceUser.hasOne(models.ServiceUserCost, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  ServiceUser.init({
    fk_service_type: DataTypes.INTEGER,
    fk_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ServiceUser',
    tableName: 'ServiceUsers',
    freezeTableName: true,
  });
  return ServiceUser;
};

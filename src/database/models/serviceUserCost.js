import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ServiceUserCost extends Model {
    static associate(models) {
      ServiceUserCost.belongsTo(models.ServiceUser, {
        foreignKey: 'fk_service_user',
        as: 'fk_service_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  ServiceUserCost.init({
    cost: DataTypes.DOUBLE,
    fk_service_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ServiceUserCost',
    tableName: 'ServiceUserCosts',
    freezeTableName: true,
  });
  return ServiceUserCost;
};

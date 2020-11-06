import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ServiceType extends Model {
    static associate(models) {
      ServiceType.hasOne(models.ServiceUser, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  ServiceType.init({
    type: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'ServiceType',
    tableName: 'ServiceTypes',
    freezeTableName: true,
  });
  return ServiceType;
};

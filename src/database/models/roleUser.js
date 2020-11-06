import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RoleUser extends Model {
    static associate(models) {
      RoleUser.belongsTo(models.User, {
        foreignKey: 'fk_user',
        as: 'fk_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      RoleUser.belongsTo(models.RoleType, {
        foreignKey: 'fk_role_type',
        as: 'fk_role_type',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  RoleUser.init({
    fk_role_type: DataTypes.INTEGER,
    fk_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'RoleUser',
    tableName: 'RoleUsers',
    freezeTableName: true,
  });
  return RoleUser;
};

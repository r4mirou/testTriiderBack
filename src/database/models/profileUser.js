import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProfileUsers extends Model {
    static associate(models) {
      ProfileUsers.belongsTo(models.User, {
        foreignKey: 'fk_user',
        as: 'fk_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  ProfileUsers.init({
    name: { type: DataTypes.STRING, allowNull: false },
    about: DataTypes.TEXT,
    fk_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProfileUser',
    tableName: 'ProfileUsers',
    freezeTableName: true,
  });
  return ProfileUsers;
};

import { Model } from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.ProfileUser, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      User.hasOne(models.RoleUser, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      User.hasOne(models.ServiceUserCost, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      User.hasOne(models.Calendar, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }

  User.init({
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    freezeTableName: true,
    hooks: {
      beforeCreate: (user) => {
        const salt = genSaltSync();
        user.password = hashSync(user.password, salt); // eslint-disable-line
      },
      beforeUpdate: (user) => {
        if (user.changed('password')) {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt); // eslint-disable-line
        }
      },
    },
  });

  User.prototype.isPassword = (password, encodedPassword) => compareSync(password, encodedPassword);

  return User;
};

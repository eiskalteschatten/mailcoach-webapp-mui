import { Model, DataTypes } from 'sequelize';

import sequelize from '@mc/db';

import User from './User';

export class UserSetting extends Model {
  id!: number;
  fkUser: number;
  language: string;
  theme: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

UserSetting.init({
  fkUser: {
    type: DataTypes.INTEGER,
    field: 'fk_user'
  },
  language: {
    type: DataTypes.STRING,
    field: 'language'
  },
  theme: {
    type: DataTypes.STRING,
    field: 'theme'
  }
}, {
  sequelize,
  modelName: 'user_setting',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

UserSetting.belongsTo(User, {
  as: 'user',
  foreignKey: 'fkUser',
  targetKey: 'id'
});

User.hasMany(UserSetting, {
  as: 'userSetting',
  foreignKey: 'fkUser',
  sourceKey: 'id'
});

if (process.env.NODE_ENV === 'test') {
  UserSetting.sync();
}

export default UserSetting;

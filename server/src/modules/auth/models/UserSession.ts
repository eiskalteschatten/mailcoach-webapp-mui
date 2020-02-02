import { Model, DataTypes } from 'sequelize';

import sequelize from '@mc/db';

import User from './User';

export class UserSession extends Model {
  id!: number;
  fkUser: number;
  refreshToken: string;
  instanceId: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

UserSession.init({
  fkUser: {
    type: DataTypes.INTEGER,
    field: 'fk_user'
  },
  refreshToken: {
    type: DataTypes.STRING,
    field: 'refresh_token'
  },
  instanceId: {
    type: DataTypes.UUID,
    field: 'instance_id'
  }
}, {
  sequelize,
  modelName: 'user_session',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

UserSession.belongsTo(User, {
  as: 'user',
  foreignKey: 'fkUser',
  targetKey: 'id'
});

User.hasMany(UserSession, {
  as: 'userSession',
  foreignKey: 'fkUser',
  sourceKey: 'id'
});

if (process.env.NODE_ENV === 'test') {
  UserSession.sync();
}

export default UserSession;

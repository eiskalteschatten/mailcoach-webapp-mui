import { Model, DataTypes } from 'sequelize';

import sequelize from '@mc/db';

import User from './User';

export class UserSession extends Model {
  id!: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  lastLogin: Date;
  status: string;
  avatar: string;
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
  modelName: 'user_session'
});

UserSession.belongsTo(User, {
  as: 'userSession',
  foreignKey: 'fkUser',
  targetKey: 'id'
});

if (process.env.NODE_ENV === 'test') {
  UserSession.sync();
}

export default UserSession;

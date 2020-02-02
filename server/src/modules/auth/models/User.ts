import { Model, DataTypes } from 'sequelize';

import sequelize from '@mc/db';

export class User extends Model {
  id!: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: Date;
  status: string;
  avatar: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

User.init({
  username: {
    type: DataTypes.STRING,
    field: 'username'
  },
  password: {
    type: DataTypes.STRING,
    field: 'password'
  },
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name'
  },
  email: {
    type: DataTypes.STRING,
    field: 'email'
  },
  lastLogin: {
    type: DataTypes.DATE,
    field: 'last_login'
  },
  status: {
    type: DataTypes.STRING,
    field: 'status'
  },
  avatar: {
    type: DataTypes.STRING,
    field: 'avatar'
  }
}, {
  sequelize,
  modelName: 'user'
});

if (process.env.NODE_ENV === 'test') {
  User.sync();
}

export default User;

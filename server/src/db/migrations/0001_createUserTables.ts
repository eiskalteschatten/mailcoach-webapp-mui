import { QueryInterface } from 'sequelize';

export default {
  up: async (query: QueryInterface, DataTypes: any): Promise<void> => {
    try {
      const tableDesc = await query.describeTable('users');
      if (tableDesc['username']) return Promise.resolve();
    }
    catch (error) {
      // Silently fail because the table most likely doesn't exist and will be
      // created later
    }

    await query.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
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
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });

    await query.createTable('user_sessions', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      kUser: {
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
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });

    return Promise.resolve();
  },

  down: async (query: QueryInterface): Promise<void> => {
    await query.dropTable('users');
    await query.dropTable('user_sessions');

    return Promise.resolve();
  }
};

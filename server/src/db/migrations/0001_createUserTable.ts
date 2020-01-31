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

    return query.createTable('users', {
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
  },

  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable('users');
  }
};

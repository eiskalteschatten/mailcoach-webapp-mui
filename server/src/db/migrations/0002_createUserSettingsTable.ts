import { QueryInterface } from 'sequelize';

export default {
  up: async (query: QueryInterface, DataTypes: any): Promise<void> => {
    try {
      const tableDesc = await query.describeTable('user_settings');
      if (tableDesc['fk_user']) return Promise.resolve();
    }
    catch (error) {
      // Silently fail because the table most likely doesn't exist and will be
      // created later
    }

    await query.createTable('user_settings', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
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
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    });

    return Promise.resolve();
  },

  down: async (query: QueryInterface): Promise<void> => {
    await query.dropTable('user_settings');

    return Promise.resolve();
  }
};

import { QueryInterface } from 'sequelize';

export default {
  up: async (query: QueryInterface, DataTypes: any): Promise<void> => {
    try {
      const tableDesc = await query.describeTable('rss_articles');
      if (tableDesc['title§']) return Promise.resolve();
    }
    catch (error) {
      // Silently fail because the table most likely doesn't exist and will be
      // created later
    }

    await query.createTable('rss_articles', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        field: 'title'
      },
      link: {
        type: DataTypes.STRING,
        field: 'link'
      },
      pubDate: {
        type: DataTypes.DATE,
        field: 'pub_date',
        set(value: Date | string): void {
          const setValue = typeof value === 'string' ? new Date(value) : value;
          this.setDataValue('pubDate', setValue);
        }
      },
      creator: {
        type: DataTypes.STRING,
        field: 'creator'
      },
      contentSnippet: {
        type: DataTypes.TEXT,
        field: 'content_snippet'
      },
      content: {
        type: DataTypes.TEXT,
        field: 'content'
      },
      guid: {
        type: DataTypes.STRING,
        field: 'guid'
      },
      read: {
        type: DataTypes.BOOLEAN,
        field: 'read'
      },
      markedAsReadAt: {
        type: DataTypes.DATE,
        field: 'marked_as_read_at',
        set(value: Date | string): void {
          const setValue = typeof value === 'string' ? new Date(value) : value;
          this.setDataValue('markedAsReadAt', setValue);
        }
      },
      fkFeed: {
        type: DataTypes.INTEGER,
        field: 'fk_feed'
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

    await query.createTable('rss_feeds', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      feedUrl: {
        type: DataTypes.STRING,
        field: 'feed_url'
      },
      link: {
        type: DataTypes.STRING,
        field: 'link'
      },
      icon: {
        type: DataTypes.STRING,
        field: 'icon'
      },
      fkFolder: {
        type: DataTypes.INTEGER,
        field: 'fk_folder'
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

    await query.createTable('rss_folders', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        field: 'name'
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
    await query.dropTable('rss_articles');
    await query.dropTable('rss_feeds');
    await query.dropTable('rss_folders');

    return Promise.resolve();
  }
};

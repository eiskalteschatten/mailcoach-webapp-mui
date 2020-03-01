import { Model, DataTypes } from 'sequelize';

import sequelize from '@mc/db';
import User from '@mc/modules/auth/models/User';

import Folder from './Folder';

export class Feed extends Model {
  id!: number;
  name: string;
  feedUrl: string;
  link: string;
  icon: string;
  fkFolder: number;
  fkUser: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Feed.init({
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
  fkUser: {
    type: DataTypes.INTEGER,
    field: 'fk_user'
  }
}, {
  sequelize,
  modelName: 'rss_feed',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

Feed.belongsTo(Folder, {
  as: 'folder',
  foreignKey: 'fkFolder',
  targetKey: 'id'
});

Folder.hasMany(Feed, {
  as: 'feeds',
  foreignKey: 'fkFolder',
  sourceKey: 'id'
});

Feed.belongsTo(User, {
  as: 'user',
  foreignKey: 'fkUser',
  targetKey: 'id'
});

User.hasMany(Feed, {
  as: 'feeds',
  foreignKey: 'fkUser',
  sourceKey: 'id'
});

if (process.env.NODE_ENV === 'test') {
  Feed.sync();
}

export default Feed;

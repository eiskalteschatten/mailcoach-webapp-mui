import { Model, DataTypes } from 'sequelize';

import sequelize from '@mc/db';
import User from '@mc/modules/auth/models/User';

export class Folder extends Model {
  id!: number;
  name: string;
  fkUser: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Folder.init({
  name: {
    type: DataTypes.STRING,
    field: 'name'
  },
  fkUser: {
    type: DataTypes.INTEGER,
    field: 'fk_user'
  }
}, {
  sequelize,
  modelName: 'rss_folder',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

Folder.belongsTo(User, {
  as: 'user',
  foreignKey: 'fkUser',
  targetKey: 'id'
});

User.hasMany(Folder, {
  as: 'folders',
  foreignKey: 'fkUser',
  sourceKey: 'id'
});

if (process.env.NODE_ENV === 'test') {
  Folder.sync();
}

export default Folder;

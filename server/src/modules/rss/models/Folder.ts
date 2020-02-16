import { Model, DataTypes } from 'sequelize';

import sequelize from '@mc/db';

export class Folder extends Model {
  id!: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Folder.init({
  name: {
    type: DataTypes.STRING,
    field: 'name'
  }
}, {
  sequelize,
  modelName: 'rss_folder',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

if (process.env.NODE_ENV === 'test') {
  Folder.sync();
}

export default Folder;

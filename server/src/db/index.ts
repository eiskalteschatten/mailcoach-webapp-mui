import { types } from 'pg';
import { Sequelize, Options } from 'sequelize';
import config from 'config';
import path from 'path';
import migrateDb from 'sequelize-migration-wrapper';

import logger from '@mc/logger';

const timestampOid = 1114;
types.setTypeParser(timestampOid, (stringValue: string): Date => new Date(stringValue + '+0000'));

const dbConfig = config.get<Options>('dbConfig');

// Clone the options because config.get returns an immutable object that doesn't work
const options = Object.assign({}, dbConfig);

const sequelize = process.env.NODE_ENV === 'test'
  ? new Sequelize(dbConfig)
  : new Sequelize(process.env.DATABASE_URL, options);

export default sequelize;

migrateDb({
  sequelize,
  path: path.resolve(__dirname, './migrations'),
  filePattern: /\.ts|\.js$/
});

export async function setupSequelize(): Promise<Sequelize> {
  try {
    await sequelize.authenticate();
    logger.info('Connection to the database has been established successfully.');

    await migrateDb.migrate();

    logger.info('Database migration scripts successfully executed.');
  }
  catch (error) {
    logger.fatal('Unable to connect to the database:', error);
  }

  return sequelize;
}

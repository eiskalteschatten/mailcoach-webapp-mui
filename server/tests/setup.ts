import sequelizeFixtures from 'sequelize-fixtures';

import models from './models';

import authFixtures from '../src/modules/auth/fixtures';
import rssFixtures from '../src/modules/rss/fixtures';

const fixtures = [
  authFixtures,
  rssFixtures
];

beforeAll((): void =>  { // eslint-disable-line no-undef
  sequelizeFixtures.loadFixtures(fixtures, models);
});

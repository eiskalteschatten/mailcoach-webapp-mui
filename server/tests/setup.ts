import sequelizeFixtures from 'sequelize-fixtures';

// Load all models and fixtures:
// import models from './models';
import authModels from '../src/modules/auth/models';

import authFixtures from '../src/modules/auth/fixtures';
// import rssFixtures from '../src/modules/rss/fixtures';

// Load all models and fixtures:
// const fixtures = [
//   authFixtures,
//   rssFixtures
// ];

beforeAll((): void =>  {// eslint-disable-line no-undef
  // Load all models and fixtures:
  // sequelizeFixtures.loadFixtures(fixtures, models)

  // Always load the auth fixtures and models before every test because users are always needed
  sequelizeFixtures.loadFixture(authFixtures, authModels);
});

import sequelizeFixtures from 'sequelize-fixtures';

import models from './models';

import authFixtures from '../src/modules/auth/fixtures';


const fixtures = [
  authFixtures
];

beforeAll((): Promise<void> =>  // eslint-disable-line no-undef
  sequelizeFixtures.loadFixtures(fixtures, models)
);

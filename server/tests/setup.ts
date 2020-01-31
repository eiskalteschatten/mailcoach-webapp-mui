import sequelizeFixtures from 'sequelize-fixtures';

import models from './models';

import authFixtures from '../src/modules/auth/fixtures';


const fixtures = [
  authFixtures
];

beforeEach(async (done: Function): Promise<void> => {  // eslint-disable-line no-undef
  try {
    await sequelizeFixtures.loadFixtures(fixtures, models);
    done();
  }
  catch(error) {
    done(error);
  }
});

import sequelizeFixtures from 'sequelize-fixtures';

import User from '../src/modules/auth/models/User';
import userFixture from '../src/modules/auth/fixtures/users';

beforeEach(async (done): Promise<void> => { // eslint-disable-line no-undef
  try {
    await sequelizeFixtures.loadFixtures([userFixture], { User });
    done();
  }
  catch(error) {
    done(error);
  }
});

import sequelizeFixtures from 'sequelize-fixtures';

import User from '../src/modules/auth/models/User';
import userFixture from '../src/modules/auth/fixtures/users';

beforeEach((): void => // eslint-disable-line no-undef
  sequelizeFixtures.loadFixtures([userFixture], { User })
);

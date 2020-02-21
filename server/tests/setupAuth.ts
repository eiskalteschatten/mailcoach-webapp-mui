import sequelizeFixtures from 'sequelize-fixtures';

import authModels from '../src/modules/auth/models';
import authFixtures from '../src/modules/auth/fixtures';

beforeAll((): void => // eslint-disable-line no-undef
  sequelizeFixtures.loadFixture(authFixtures, authModels)
);

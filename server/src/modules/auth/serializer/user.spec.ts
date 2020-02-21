import sequelizeFixtures from 'sequelize-fixtures';

import User from '../models/User';
import { serialize, deserializeModelCreateUpdate } from './user';
import fixture from '../fixtures/users';

const { data } = fixture;

describe('UserSerializer', () => {
  beforeEach(async (done): Promise<void> => {
    try {
      await sequelizeFixtures.loadFixtures([fixture], { User });
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('Exists', () => {
    expect(serialize).toBeDefined();
    expect(typeof serialize === 'function').toBeTruthy();
  });

  test('Data is correctly serialized', async () => {
    const testUser = await User.create(data);
    expect(testUser).toBeDefined();

    const expectedData = {
      ...data,
      id: testUser.id
    };

    delete expectedData.password;
    delete expectedData.status;
    delete expectedData.lastLogin;

    const serializedData = serialize(testUser);

    expect(serializedData).toEqual(expectedData);
  });

  test('Data is correctly deserialized for creating or updating a model', async () => {
    const testUser = await User.findByPk(1);
    expect(testUser).toBeDefined();

    const serializedData = {
      email: 'test@test.com',
      password: 'passwordManiac',
      firstName: 'Billy',
      lastName: 'Bower',
      status: 'active',
      avatar: 'test avatar'
    };

    const expectedData = {
      ...serializedData,
    };

    const deserializedData = deserializeModelCreateUpdate(serializedData);

    expect(deserializedData).toEqual(expectedData);
  });
});

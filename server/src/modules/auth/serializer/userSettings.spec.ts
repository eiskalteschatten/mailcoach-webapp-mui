import sequelizeFixtures from 'sequelize-fixtures';

import { serialize, deserializeModelCreateUpdate } from './userSettings';

import usersFixture from '../fixtures/users';
import fixture from '../fixtures/userSettings';

import User from '../models/User';
import UserSetting from '../models/UserSetting';

const { data } = fixture;

describe('UserSettingsSerializer', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures(
      [usersFixture, fixture],
      { User, UserSetting }
    )
  );

  test('Exists', () => {
    expect(serialize).toBeDefined();
    expect(typeof serialize === 'function').toBeTruthy();
  });

  test('Data is correctly serialized', async () => {
    const testSettings = await UserSetting.create(data);
    expect(testSettings).toBeDefined();

    const expectedData = {
      ...data
    };

    delete expectedData.fkUser;

    const serializedData = serialize(testSettings);

    expect(serializedData).toEqual(expectedData);
  });

  test('Data is correctly deserialized for creating or updating a model', async () => {
    const testSettings = await UserSetting.findByPk(1);
    expect(testSettings).toBeDefined();

    const serializedData = {
      language: 'de',
      theme: 'dark'
    };

    const expectedData = {
      ...serializedData,
    };

    const deserializedData = deserializeModelCreateUpdate(serializedData);

    expect(deserializedData).toEqual(expectedData);
  });
});

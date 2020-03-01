import sequelizeFixtures from 'sequelize-fixtures';

import usersFixture from '@mc/modules/auth/fixtures/users';
import User from '@mc/modules/auth/models/User';

import Folder from '../models/Folder';
import { serialize, deserializeModelCreateUpdate } from './folders';
import fixture from '../fixtures/folders';

const { data } = fixture;

describe('FolderSerializer', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures(
      [usersFixture, fixture],
      { User, Folder }
    )
  );

  test('Exists', () => {
    expect(serialize).toBeDefined();
    expect(typeof serialize === 'function').toBeTruthy();
  });

  test('Data is correctly serialized', async () => {
    const testModel = await Folder.create(data);
    expect(testModel).toBeDefined();

    const expectedData = {
      ...data,
      id: testModel.id
    };

    delete expectedData.fkUser;

    const serializedData = serialize(testModel);

    expect(serializedData).toEqual(expectedData);
  });

  test('Data is correctly deserialized for creating or updating a model', async () => {
    const testModel = await Folder.findByPk(1);
    expect(testModel).toBeDefined();

    const serializedData = {
      name: 'test'
    };

    const expectedData = {
      ...serializedData,
    };

    const deserializedData = deserializeModelCreateUpdate(serializedData);

    expect(deserializedData).toEqual(expectedData);
  });
});

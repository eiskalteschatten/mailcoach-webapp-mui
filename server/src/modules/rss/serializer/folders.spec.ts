import sequelizeFixtures from 'sequelize-fixtures';

import Folder from '../models/Folder';
import { serialize, deserializeModelCreateUpdate } from './folders';
import fixture from '../fixtures/folders';

const { data } = fixture;

describe('FolderSerializer', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures([fixture], { Folder })
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

import sequelizeFixtures from 'sequelize-fixtures';

import Feed from '../models/Feed';
import { serialize, deserializeModelCreateUpdate } from './feeds';
import fixture from '../fixtures/feeds';

const { data } = fixture;

describe('FeedSerializer', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures([fixture], { Feed })
  );

  test('Exists', () => {
    expect(serialize).toBeDefined();
    expect(typeof serialize === 'function').toBeTruthy();
  });

  test('Data is correctly serialized', async () => {
    const testModel = await Feed.create(data);
    expect(testModel).toBeDefined();

    const expectedData = {
      ...data,
      id: testModel.id
    };

    const serializedData = serialize(testModel);

    expect(serializedData).toEqual(expectedData);
  });

  test('Data is correctly deserialized for creating or updating a model', async () => {
    const testModel = await Feed.findByPk(1);
    expect(testModel).toBeDefined();

    const serializedData = {
      name: 'test',
      feedUrl: 'test',
      link: 'test',
      icon: 'test',
      fkFolder: 1
    };

    const expectedData = {
      ...serializedData,
    };

    const deserializedData = deserializeModelCreateUpdate(serializedData);

    expect(deserializedData).toEqual(expectedData);
  });
});

import sequelizeFixtures from 'sequelize-fixtures';

import Article from '../models/Article';
import { serialize, deserializeModelCreateUpdate } from './articles';
import fixture from '../fixtures/articles';

const { data } = fixture;

describe('ArticleSerializer', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures([fixture], { Article })
  );

  test('Exists', () => {
    expect(serialize).toBeDefined();
    expect(typeof serialize === 'function').toBeTruthy();
  });

  test('Data is correctly serialized', async () => {
    const testModel = await Article.create(data);
    expect(testModel).toBeDefined();

    const expectedData = {
      ...data,
      id: testModel.id
    };

    const serializedData = serialize(testModel);

    expect(serializedData).toEqual(expectedData);
  });

  test('Data is correctly deserialized for creating or updating a model', async () => {
    const testModel = await Article.findByPk(1);
    expect(testModel).toBeDefined();

    const serializedData = {
      title: 'test',
      link: 'test',
      pubDate: new Date(),
      creator: 'test',
      contentSnippet: 'test',
      content: 'test',
      guid: 'test',
      read: true,
      markedAsReadAt: new Date(),
      fkFeed: 1
    };

    const expectedData = {
      ...serializedData,
    };

    const deserializedData = deserializeModelCreateUpdate(serializedData);

    expect(deserializedData).toEqual(expectedData);
  });
});

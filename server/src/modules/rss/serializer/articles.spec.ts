import sequelizeFixtures from 'sequelize-fixtures';

import usersFixture from '@mc/modules/auth/fixtures/users';
import User from '@mc/modules/auth/models/User';

import Article from '../models/Article';
import { serialize, deserializeModelCreateUpdate } from './articles';
import fixture from '../fixtures/articles';

const { data } = fixture;

describe('ArticleSerializer', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures(
      [usersFixture, fixture],
      { User, Article }
    )
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

    delete expectedData.fkUser;

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

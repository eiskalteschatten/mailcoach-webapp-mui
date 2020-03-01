import sequelizeFixtures from 'sequelize-fixtures';

import usersFixture from '@mc/modules/auth/fixtures/users';
import User from '@mc/modules/auth/models/User';

import fixture from '../fixtures/articles';

import Article from './Article';

const { data } = fixture;

describe('Article Model', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures(
      [usersFixture, fixture],
      { User, Article }
    )
  );

  test('Exists', () => {
    expect(Article).toBeDefined();
  });

  test('Model is writable and readable', async () => {
    const newUser = await Article.create(data);

    const testModel = await Article.findByPk(newUser.id, { raw: true });

    expect(testModel).toBeDefined();
    expect(testModel.title).toEqual(data.title);
    expect(testModel.link).toEqual(data.link);
    expect(testModel.pubDate).toBeDefined();
    expect(testModel.creator).toEqual(data.creator);
    expect(testModel.contentSnippet).toEqual(data.contentSnippet);
    expect(testModel.content).toEqual(data.content);
    expect(testModel.guid).toEqual(data.guid);
    expect(testModel.read).toBeFalsy();
    expect(testModel.markedAsReadAt).toBeDefined();
  });

  test('Model is updateable', async () => {
    const newTitle = 'Franz';
    const testModel = await Article.findByPk(1);

    expect(testModel).toBeDefined();

    testModel.update({
      title: newTitle
    });

    expect(testModel.title).toEqual(newTitle);
    expect(testModel.link).toEqual(data.link);
    expect(testModel.pubDate).toBeDefined();
    expect(testModel.creator).toEqual(data.creator);
    expect(testModel.contentSnippet).toEqual(data.contentSnippet);
    expect(testModel.content).toEqual(data.content);
    expect(testModel.guid).toEqual(data.guid);
    expect(testModel.read).toBeFalsy();
    expect(testModel.markedAsReadAt).toBeDefined();
  });
});

import sequelizeFixtures from 'sequelize-fixtures';

import fixture from '../fixtures/feeds';

import Feed from './Feed';

const { data } = fixture;

describe('Feed Model', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures(
      [fixture],
      { Feed }
    )
  );

  test('Exists', () => {
    expect(Feed).toBeDefined();
  });

  test('Model is writable and readable', async () => {
    const newUser = await Feed.create(data);

    const testModel = await Feed.findByPk(newUser.id, { raw: true });

    expect(testModel).toBeDefined();
    expect(testModel.name).toEqual(data.name);
    expect(testModel.feedUrl).toEqual(data.feedUrl);
    expect(testModel.link).toEqual(data.link);
    expect(testModel.icon).toEqual(data.icon);
  });

  test('Model is updateable', async () => {
    const newName = 'Franz';
    const testModel = await Feed.findByPk(1);

    expect(testModel).toBeDefined();

    testModel.update({
      name: newName
    });

    expect(testModel.name).toEqual(newName);
    expect(testModel.feedUrl).toEqual(data.feedUrl);
    expect(testModel.link).toEqual(data.link);
    expect(testModel.icon).toEqual(data.icon);
  });
});

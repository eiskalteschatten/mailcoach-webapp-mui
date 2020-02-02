import sequelizeFixtures from 'sequelize-fixtures';

import usersFixture from '../fixtures/users';
import fixture from '../fixtures/userSessions';

import User from './User';
import UserSession from './UserSession';

const { data } = fixture;

describe('UserSession Model', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures(
      [usersFixture, fixture],
      { User, UserSession }
    )
  );

  test('Exists', () => {
    expect(UserSession).toBeDefined();
  });

  test('Model is writable and readable', async () => {
    const newUserSession = await UserSession.create(data);
    const testModel = await UserSession.findByPk(newUserSession.id, { raw: true });

    expect(testModel).toBeDefined();
    expect(testModel.fkUser).toEqual(data.fkUser);
    expect(testModel.refreshToken).toEqual(data.refreshToken);
    expect(testModel.instanceId).toEqual(data.instanceId);
  });

  test('Model is updateable', async () => {
    const newRefreshToken = 'fdmskalvjhdiovajsd';
    const testModel = await UserSession.findByPk(1);

    expect(testModel).toBeDefined();

    testModel.update({
      refreshToken: newRefreshToken
    });

    expect(testModel.fkUser).toEqual(data.fkUser);
    expect(testModel.refreshToken).toEqual(newRefreshToken);
    expect(testModel.instanceId).toEqual(data.instanceId);
  });
});

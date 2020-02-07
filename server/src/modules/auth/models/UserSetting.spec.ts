import sequelizeFixtures from 'sequelize-fixtures';

import usersFixture from '../fixtures/users';
import fixture from '../fixtures/userSettings';

import User from './User';
import UserSetting from './UserSetting';

const { data } = fixture;

describe('UserSetting Model', () => {
  beforeAll((): Promise<void> =>
    sequelizeFixtures.loadFixtures(
      [usersFixture, fixture],
      { User, UserSetting }
    )
  );

  test('Exists', () => {
    expect(UserSetting).toBeDefined();
  });

  test('Model is writable and readable', async () => {
    const newUserSetting = await UserSetting.create(data);
    const testModel = await UserSetting.findByPk(newUserSetting.id, { raw: true });

    expect(testModel).toBeDefined();
    expect(testModel.fkUser).toEqual(data.fkUser);
    expect(testModel.language).toEqual(data.language);
    expect(testModel.theme).toEqual(data.theme);
  });

  test('Model is updateable', async () => {
    const newLanguage = 'de';
    const testModel = await UserSetting.findByPk(1);

    expect(testModel).toBeDefined();

    testModel.update({
      language: newLanguage
    });

    expect(testModel.fkUser).toEqual(data.fkUser);
    expect(testModel.language).toEqual(newLanguage);
    expect(testModel.theme).toEqual(data.theme);
  });
});

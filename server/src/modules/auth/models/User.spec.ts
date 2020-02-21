import sequelizeFixtures from 'sequelize-fixtures';

import fixture from '../fixtures/users';

import User from './User';

const { data } = fixture;

describe('User Model', () => {
  beforeEach(async (done): Promise<void> => {
    try {
      await sequelizeFixtures.loadFixtures([fixture], { User });
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('Exists', () => {
    expect(User).toBeDefined();
  });

  test('Model is writable and readable', async () => {
    const newUser = await User.create(data);

    const testModel = await User.findByPk(newUser.id, { raw: true });

    expect(testModel).toBeDefined();
    expect(testModel.username).toEqual(data.username);
    expect(testModel.password).toEqual(data.password);
    expect(testModel.firstName).toEqual(data.firstName);
    expect(testModel.lastName).toEqual(data.lastName);
    expect(testModel.email).toEqual(data.email);
    expect(testModel.status).toEqual(data.status);
    expect(testModel.avatar).toEqual(data.avatar);
  });

  test('Model is updateable', async () => {
    const newFirstName = 'Franz';
    const testModel = await User.findByPk(1);

    expect(testModel).toBeDefined();

    testModel.update({
      firstName: newFirstName
    });

    expect(testModel.username).toEqual(data.username);
    expect(testModel.password).toEqual(data.password);
    expect(testModel.firstName).toEqual(newFirstName);
    expect(testModel.lastName).toEqual(data.lastName);
    expect(testModel.email).toEqual(data.email);
    expect(testModel.status).toEqual(data.status);
    expect(testModel.avatar).toEqual(data.avatar);
  });
});

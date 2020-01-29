import User from './User';
import data from '../fixtures/users';

describe('User Model', () => {
  test('Exists', () => {
    expect(User).toBeDefined();
  });

  test('Model is writable and readable', async () => {
    const newUser = await User.create(data);

    const testUser = await User.findByPk(newUser.id, { raw: true });

    expect(testUser).toBeDefined();
    expect(testUser.username).toEqual(data.username);
    expect(testUser.password).toEqual(data.password);
    expect(testUser.firstName).toEqual(data.firstName);
    expect(testUser.lastName).toEqual(data.lastName);
    expect(testUser.status).toEqual(data.status);
    expect(testUser.avatar).toEqual(data.avatar);
  });

  test('Model is updateable', async () => {
    const newUser = await User.create(data);

    const newFirstName = 'Franz';
    const testUser = await User.findByPk(newUser.id);

    expect(testUser).toBeDefined();

    testUser.update({
      firstName: newFirstName
    });

    expect(testUser.username).toEqual(data.username);
    expect(testUser.password).toEqual(data.password);
    expect(testUser.firstName).toEqual(newFirstName);
    expect(testUser.lastName).toEqual(data.lastName);
    expect(testUser.status).toEqual(data.status);
    expect(testUser.avatar).toEqual(data.avatar);
  });
});

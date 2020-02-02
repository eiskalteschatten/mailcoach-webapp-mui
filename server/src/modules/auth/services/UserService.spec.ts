import sequelizeFixtures from 'sequelize-fixtures';

import UserService from './UserService';
import { ModelCreateUpdate, PasswordChange } from '../interfaces/User';
import { deserializeModelCreateUpdate } from '../serializer/user';
import fixture from '../fixtures/users';
import User from '../models/User';

const { data } = fixture;

describe('User Service', () => {
  let userService: UserService;

  beforeAll(async (done) => {
    try {
      await sequelizeFixtures.loadFixtures([fixture], { User });
      userService = new UserService();
      await userService.setUser(data.username);
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('Exists', () => {
    expect(userService).toBeDefined();
  });

  test('User is defined', () => {
    const user = userService.getUser();
    expect(user).toBeDefined();
  });

  test('User is set by id', async () => {
    const localUserService = new UserService();
    await localUserService.setUser(1);

    const user = userService.getUser();

    expect(user).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.status).toBeDefined();
    expect(user.avatar).toBeDefined();
  });

  test('User is set by username', async () => {
    const localUserService = new UserService();
    await localUserService.setUser(data.username);

    const user = userService.getUser();

    expect(user).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.status).toBeDefined();
    expect(user.avatar).toBeDefined();
  });

  test('New user registration fails because username already exists', async (done) => {
    try {
      const localUserService = new UserService();
      const registerData: ModelCreateUpdate = {
        username: data.username,
        firstName: 'Anna-Marie',
        lastName: 'Belle',
        password: 'ihearttractors123!',
        email: 'test@test.com'
      };

      const deserialized = deserializeModelCreateUpdate(registerData);

      await expect(localUserService.register(deserialized))
        .rejects
        .toThrow('Could not create user because a user with this username already exists!');

      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('New user registration fails because the fields are missing', async (done) => {
    try {
      const localUserService = new UserService();
      const registerData: ModelCreateUpdate = {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        email: ''
      };

      const deserialized = deserializeModelCreateUpdate(registerData);

      await expect(localUserService.register(deserialized))
        .rejects
        .toThrow('Could not create user because a field was missing!');

      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('User can login via JWT', async () => {
    const canLogin: boolean = await userService.jwtLogin(1);
    expect(canLogin).toBeDefined();
    expect(canLogin).toBeTruthy();
  });

  test('User information can be updated', async (done) => {
    try {
      const registerData: ModelCreateUpdate = {
        username: 'Billy',
        firstName: 'Billy',
        lastName: 'Bob',
        email: 'test@test.com'
      };

      const deserialized = deserializeModelCreateUpdate(registerData);

      await userService.updateUser(1, deserialized);
      const user = userService.getUser();
      expect(user).toBeDefined();
      expect(user.username).toEqual(registerData.username);
      expect(user.firstName).toEqual(registerData.firstName);
      expect(user.lastName).toEqual(registerData.lastName);
      expect(user.email).toEqual(data.email);

      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('User password can be changed', async (done) => {
    try {
      const updateData: PasswordChange = {
        newPassword: 'jfkEJF48!!fjkd',
        currentPassword: data.password
      };

      await userService.updatePassword(1, updateData);
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('User password can be changed without old password', async (done) => {
    try {
      const updateData: PasswordChange = {
        newPassword: '3748vnmcxjFJWIE%',
      };

      await userService.updatePasswordWithoutOldPassword(1, updateData);
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('User password cannot be changed because old password is wrong', async (done) => {
    try {
      const updateData: PasswordChange = {
        newPassword: 'newffdsafdsa',
        currentPassword: 'vvsnhgkjglkh'
      };

      await userService.updatePassword(1, updateData);
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('User token can be generated', async () => {
    const token = userService.generateJwt();
    expect(token).toBeDefined();
  });

  test('Getting all users works', async () => {
    const users = userService.getAllUsers();
    expect(users).toBeDefined();
  });
});

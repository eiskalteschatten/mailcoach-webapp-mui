import express from 'express';
import request from 'supertest';

import testApp from '@mc/lib/tests/testExpressApp';
import { getAuthBearerHeader, getTokenByUsername } from '@mc/lib/tests/helper';

import userAdminController from './userAdmin';
import { ModelCreateUpdate, PasswordChange } from '../interfaces/User';
import UserService from '../services/UserService';
import { deserializeModelCreateUpdate } from '../serializer/user';

describe('User Admin Controller', () => {
  let app: express.Application;
  let registerData: ModelCreateUpdate;

  beforeAll(async (done) => {
    app = await testApp.setupApp();
    app.use(userAdminController.router);

    registerData = {
      username: 'tractorKing125',
      firstName: 'Billy',
      lastName: 'Bob',
      password: 'jfkldjafkldsj4980283!@£',
      email: 'tractor@field.com'
    };

    const deserialized = deserializeModelCreateUpdate(registerData);

    const userService = new UserService();
    await userService.register(deserialized);

    done();
  });

  test('Exists', () => {
    expect(userAdminController).toBeDefined();
  });

  test('Getting all users works', async () => {
    const token = await getAuthBearerHeader();
    const response: request.Response = await request(app)
      .get('/')
      .set({
        Authorization: token
      })
      .send();

    expect(response.status).toEqual(200);

    const user = response.body.users[0];

    expect(user.id).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.avatar).toBeDefined();
  });

  test('Creating a new user works', async () => {
    const token = await getAuthBearerHeader();

    const newRegisterData = {
      ...registerData,
      username: 'redBarns'
    };

    const response: request.Response = await request(app)
      .post('/')
      .set({
        Authorization: token
      })
      .send(newRegisterData);

    expect(response.status).toEqual(200);

    const user = response.body.user;

    expect(user.id).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.avatar).toBeDefined();
  });

  test('Updating a user password works', async () => {
    const token = await getTokenByUsername(registerData.username);
    const updateData: PasswordChange = {
      newPassword: 'fmjFDfjioew%*($£43u590',
      currentPassword: registerData.password
    };

    const response: request.Response = await request(app)
      .patch('/1/password')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send(updateData);

    expect(response.status).toEqual(204);
  });

  test('Updating a user password doesn\'t work if the current password is invalid', async () => {
    const token = await getAuthBearerHeader();
    const updateData: PasswordChange = {
      newPassword: 'new',
      currentPassword: 'NOTVALID!'
    };

    const response: request.Response = await request(app)
      .patch('/1/password')
      .set({
        Authorization: token
      })
      .send(updateData);

    expect(response.status).toEqual(406);
    expect(response.body.message).toEqual('Could not change the user\'s password because the old password is incorrect!');
  });

  test('Updating a user works', async () => {
    const token = await getAuthBearerHeader();
    const updateData: ModelCreateUpdate = {
      firstName: 'Jack'
    };

    const response: request.Response = await request(app)
      .put('/1')
      .set({
        Authorization: token
      })
      .send(updateData);

    expect(response.status).toEqual(200);

    const user = response.body.user;

    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.avatar).toBeDefined();
  });

  test('Using the generic user update endpoint does not allow password changes', async () => {
    const token = await getAuthBearerHeader();
    const updateData: ModelCreateUpdate = {
      firstName: 'John',
      password: 'blah'
    };

    const response: request.Response = await request(app)
      .put('/1')
      .set({
        Authorization: token
      })
      .send(updateData);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Changing a user\'s password is not allowed via this endpoint!');
  });

  test('Deleting a user works', async () => {
    const token = await getTokenByUsername(registerData.username);

    const response: request.Response = await request(app)
      .delete('/2')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send();

    expect(response.status).toEqual(204);
  });
});

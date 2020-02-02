import express from 'express';
import request from 'supertest';

import testApp from '@mc/lib/tests/testExpressApp';
import { getAuthBearerHeader, getTokenByUsername } from '@mc/lib/tests/helper';

import selfController from './user';
import { ModelCreateUpdate, PasswordChange } from '../interfaces/User';
import UserService from '../services/UserService';
import { deserializeModelCreateUpdate } from '../serializer/user';

describe('User Controller', () => {
  let app: express.Application;
  let registerData: ModelCreateUpdate;

  beforeAll(async (done) => {
    app = await testApp.setupApp();
    app.use(selfController.router);

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
    expect(selfController).toBeDefined();
  });

  test('Getting a user\'s own information works', async () => {
    const token = await getTokenByUsername(registerData.username);
    const response: request.Response = await request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`)
      .send();

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
      newPassword: 'fdjkslf%*9859403FDS',
      currentPassword: registerData.password
    };

    const response: request.Response = await request(app)
      .patch('/password')
      .set('Authorization', `Bearer ${token}`)
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
      .patch('/password')
      .set({
        Authorization: token,
        'X-BB-OrgId': 1
      })
      .send(updateData);

    expect(response.status).toEqual(406);
    expect(response.body.message).toEqual('Could not change the user\'s password because the old password is incorrect!');
  });

  test('Updating a user works', async () => {
    const token = await getAuthBearerHeader();
    const updateData: ModelCreateUpdate = {
      firstName: 'Franzl'
    };

    const expectedData = {
      ...registerData,
      firstName: updateData.firstName
    };

    const response: request.Response = await request(app)
      .put('/')
      .set({
        Authorization: token,
        'X-BB-OrgId': 1
      })
      .send(updateData);

    expect(response.status).toEqual(200);

    const user = response.body.user;

    expect(user.id).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.avatar).toBeDefined();
  });

  test('Using the generic user update endpoint does not allow password changes', async () => {
    const token = await getAuthBearerHeader();
    const updateData: ModelCreateUpdate = {
      firstName: 'Joe',
      password: 'blah'
    };

    const response: request.Response = await request(app)
      .put('/')
      .set({
        Authorization: token,
        'X-BB-OrgId': 1
      })
      .send(updateData);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Changing a user\'s password is not allowed via this endpoint!');
  });
});

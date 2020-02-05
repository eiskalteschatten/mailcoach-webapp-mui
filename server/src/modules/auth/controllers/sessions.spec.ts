import express from 'express';
import request from 'supertest';

import testApp from '@mc/lib/tests/testExpressApp';
import { getAuthBearerHeader } from '@mc/lib/tests/helper';

import sessionsController from './sessions';

import User from '../models/User';

import fixture from '../fixtures/users';
import UserService from '../services/UserService';

describe('Sessions Controller', () => {
  let app: express.Application;
  let userService: UserService;
  let user: User;

  const loginData = {
    username: fixture.data.username,
    password: fixture.data.password
  };

  beforeAll(async (done) => {
    try {
      userService = new UserService();
      user = await userService.register(fixture.data);

      app = await testApp.setupApp();
      app.use(sessionsController.router);
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('Exists', () => {
    expect(sessionsController).toBeDefined();
  });

  test('Getting all sessions works', async () => {
    const token = await getAuthBearerHeader();
    const response: request.Response = await request(app)
      .get('/')
      .set({
        Authorization: token
      })
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.sessions).toBeDefined();
  });

  test('Logging out of all of a user\'s sessions works', async () => {
    const token = await getAuthBearerHeader();
    const response: request.Response = await request(app)
      .post('/logout')
      .set({
        Authorization: token
      })
      .send({
        instanceId: ''
      });

      expect(response.status).toEqual(204);
  });
});

import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import testApp from '@mc/lib/tests/testExpressApp';

import authController from './auth';

import User from '../models/User';
import UserSession from '../models/UserSession';

import fixture from '../fixtures/users';
import UserService from '../services/UserService';

describe('Auth Controller', () => {
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
      app.use(authController.router);
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('Exists', () => {
    expect(authController).toBeDefined();
  });

  test('Logging in works', async () => {
    const response: request.Response = await request(app)
      .post('/login')
      .send(loginData);

    expect(response.status).toEqual(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });

  test('Logging in with wrong password does not work', async () => {
    const response: request.Response = await request(app)
      .post('/login')
      .send({
        username: loginData.username,
        password: 'Iamsoooowrong'
      });

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Invalid credentials');
  });

  test('Refreshing an access token works', async () => {
    const loginResponse: request.Response = await request(app)
      .post('/login')
      .send(loginData);

    const refreshToken = loginResponse.body.refreshToken;

    const response: request.Response = await request(app)
      .post('/token')
      .set({
        Authorization: `Bearer ${refreshToken}`
      })
      .send();

      expect(response.status).toEqual(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
  });

  test('Logging out works', async () => {
    const loginResponse: request.Response = await request(app)
      .post('/login')
      .send(loginData);

    const refreshToken = loginResponse.body.refreshToken;

    const response: request.Response = await request(app)
      .post('/logout')
      .set({
        Authorization: `Bearer ${refreshToken}`
      })
      .send();

      expect(response.status).toEqual(204);

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET) as any;

      const userSession = await UserSession.findOne({
        where: {
          fkUser: decoded.id,
          instanceId: decoded.instanceId
        }
      });

      expect(userSession).toBeNull();
  });
});

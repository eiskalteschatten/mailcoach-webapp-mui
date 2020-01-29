import express from 'express';
import request from 'supertest';

import testApp from '@mc/lib/tests/testExpressApp';

import authController from './auth';

describe('Auth Controller', () => {
  let app: express.Application;

  const loginData = {
    username: 'testUser',
    password: 'testPassword'
  };

  beforeAll(async (done) => {
    try {
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

  // test('Logging in works', async () => {
  //   const response: request.Response = await request(app)
  //     .post('/login')
  //     .send(loginData);

  //   expect(response.status).toEqual(200);
  //   expect(response.body.token).toBeDefined();
  // });

  // test('Logging in with wrong password does not work', async () => {
  //   const response: request.Response = await request(app)
  //     .post('/login')
  //     .send({
  //       username: loginData.username,
  //       password: 'Iamsoooowrong'
  //     });

  //   expect(response.status).toEqual(401);
  //   expect(response.body.message).toEqual('Invalid credentials');
  // });
});

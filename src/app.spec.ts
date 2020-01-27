import { Application } from 'express';
import request from 'supertest';

import App from './app';

describe('The main app', () => {
  let app: Application;

  beforeAll(async (done) => {
    app = await App.setupApp();
    done();
  });

  test('Is set up', () => {
    expect(app).toBeDefined();
  });

  test('Test 404 response', async () => {
    const response: request.Response = await request(app).get('/thisendpointdoesnotexist');
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Not found');
  });
});

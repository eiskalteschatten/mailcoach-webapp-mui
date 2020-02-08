import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';

import testApp from '@mc/lib/tests/testExpressApp';
import { getTokenByUsername } from '@mc/lib/tests/helper';

import settingsController from './settings';
import { ModelCreateUpdate } from '../interfaces/UserSettings';

import usersFixture from '../fixtures/users';
import fixture from '../fixtures/userSettings';
import User from '../models/User';
import UserSetting from '../models/UserSetting';

describe('User Settings Controller', () => {
  let app: express.Application;
  let token: string;

  const createData: ModelCreateUpdate = {
    language: 'en',
    theme: 'dark'
  };;

  beforeAll(async (done) => {
    await sequelizeFixtures.loadFixtures(
      [usersFixture, fixture],
      { User, UserSetting }
    );

    app = await testApp.setupApp();
    app.use(settingsController.router);

    token = await getTokenByUsername(usersFixture.data.username);

    done();
  });

  test('Exists', () => {
    expect(settingsController).toBeDefined();
  });

  test('Getting a user\'s settings works', async () => {
    const response: request.Response = await request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);

    const settings = response.body.settings;

    expect(settings).toBeDefined();
    expect(settings.language).toBeDefined();
    expect(settings.theme).toBeDefined();
  });

  test('Updating user settings works', async () => {
    const newLanguage = 'de';
    const updateData = {
      language: newLanguage
    };

    const response: request.Response = await request(app)
      .put('/')
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);

      expect(response.status).toEqual(200);

      const settings = response.body.settings;

      expect(settings).toBeDefined();
      expect(settings.language).toEqual(newLanguage);
      expect(settings.theme).toBeDefined();
  });
});

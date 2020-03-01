import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';

import testApp from '@mc/lib/tests/testExpressApp';
import { getTokenByUsername } from '@mc/lib/tests/helper';
import usersFixture from '@mc/modules/auth/fixtures/users';
import User from '@mc/modules/auth/models/User';

import statsController from './stats';

import Folder from '../models/Folder';
import Feed from '../models/Feed';
import Article from '../models/Article';
import folderfixture from '../fixtures/folders';
import feedfixture from '../fixtures/feeds';
import articlefixture from '../fixtures/articles';

describe('Stats Controller', () => {
  let app: express.Application;
  let token: string;

  beforeAll(async (done) => {
    try {
      // await sequelizeFixtures.loadFixtures(
      //   [usersFixture, folderfixture, feedfixture, articlefixture],
      //   { User, Folder, Feed, Article }
      // );

      app = await testApp.setupApp();
      app.use(statsController.router);

      token = await getTokenByUsername(usersFixture.data.username);

      done();
    }
    catch(error) {
      done(error);
    }
  });

  test.todo('Re-add tests');

  // test('Exists', () => {
  //   expect(statsController).toBeDefined();
  // });

  // test('Getting all stats works', async () => {
  //   const response: request.Response = await request(app)
  //     .get('/')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(response.status).toEqual(200);

  //   expect(response.body.unreadTotal).toBeDefined();
  //   expect(response.body.unreadPerFeed).toBeDefined();
  //   expect(response.body.unreadPerFolder).toBeDefined();
  // });
});

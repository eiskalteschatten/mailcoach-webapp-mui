import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';

import testApp from '@mc/lib/tests/testExpressApp';

import statsController from './stats';

import Folder from '../models/Folder';
import Feed from '../models/Feed';
import Article from '../models/Article';
import folderfixture from '../fixtures/folders';
import feedfixture from '../fixtures/feeds';
import articlefixture from '../fixtures/articles';

describe('Stats Controller', () => {
  let app: express.Application;

  beforeAll(async (done) => {
    try {
      await sequelizeFixtures.loadFixtures(
        [folderfixture, feedfixture, articlefixture],
        { Folder, Feed, Article }
      );

      app = await testApp.setupApp();
      app.use(statsController.router);

      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('Exists', () => {
    expect(statsController).toBeDefined();
  });

  test('Getting all folders works', async () => {
    const response: request.Response = await request(app)
      .get('/')
      .send();

    expect(response.status).toEqual(200);

    expect(response.body.unreadTotal).toBeDefined();
    expect(response.body.unreadPerFeed).toBeDefined();
    expect(response.body.unreadPerFolder).toBeDefined();
  });
});

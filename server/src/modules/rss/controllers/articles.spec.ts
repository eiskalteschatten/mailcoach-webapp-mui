import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';

import testApp from '@mc/lib/tests/testExpressApp';

import articlesController from './articles';
import Article from '../models/Article';
import fixture from '../fixtures/articles';

describe('Articles Controller', () => {
  let app: express.Application;

  beforeAll(async (done) => {
    try {
      await sequelizeFixtures.loadFixtures([fixture], { Article });
      app = await testApp.setupApp();
      app.use(articlesController.router);
      done();
    }
    catch(error) {
      done(error);
    }
  });

  test('Exists', () => {
    expect(articlesController).toBeDefined();
  });

  test('Getting all articles works', async () => {
    const response: request.Response = await request(app)
      .get('/')
      .send();

    expect(response.status).toEqual(200);

    const articles = response.body.articles;

    expect(articles).toBeDefined();
  });

  test.todo('Finish the tests after creating the serializers!');
});

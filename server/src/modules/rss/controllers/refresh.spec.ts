import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';
import fs from 'fs';
import path from 'path';
import nock from 'nock';

import testApp from '@mc/lib/tests/testExpressApp';

import refreshController from './refresh';
import Article from '../models/Article';
import Feed from '../models/Feed';
import articlesFixture from '../fixtures/articles';
import feedsFixture from '../fixtures/feeds';

describe('Feeds Refresh Controller', () => {
  let app: express.Application;
  let testRss: string;

  beforeAll(async (done) => {
    try {
      await sequelizeFixtures.loadFixtures(
        [articlesFixture, feedsFixture],
        { Article, Feed }
      );

      app = await testApp.setupApp();
      app.use(refreshController.router);

      fs.readFile(path.resolve(__dirname, '../../../../tests/rss.xml'), 'utf8', (error: Error, data: any): void => {
        if (error) {
          done(error);
        }
        testRss = data;
        done();
      });
    }
    catch(error) {
      done(error);
    }
  });

  beforeEach(() => {
    nock('https://www.historyrhymes.info/')
      .get('/feed')
      .reply(200, testRss);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('Exists', () => {
    expect(refreshController).toBeDefined();
  });

  test('Refreshing all feeds works', async () => {
    const response: request.Response = await request(app)
      .post('/')
      .send();

    expect(response.status).toEqual(200);

    const articles = response.body.articles;

    expect(articles).toBeDefined();
    expect(articles[0].id).toBeDefined();
    expect(articles[0].title).toBeDefined();
    expect(articles[0].link).toBeDefined();
    expect(articles[0].pubDate).toBeDefined();
    expect(articles[0].creator).toBeDefined();
    expect(articles[0].contentSnippet).toBeDefined();
    expect(articles[0].content).toBeDefined();
    expect(articles[0].guid).toBeDefined();
    expect(articles[0].read).toBeDefined();
    expect(articles[0].markedAsReadAt).toBeDefined();
  });

  test('Refreshing a feed works', async () => {
    await Article.destroy({
      truncate: true
    });

    const response: request.Response = await request(app)
      .post('/1')
      .send();

    expect(response.status).toEqual(200);

    const articles = response.body.articles;

    expect(articles).toBeDefined();
    expect(articles[0].id).toBeDefined();
    expect(articles[0].title).toBeDefined();
    expect(articles[0].link).toBeDefined();
    expect(articles[0].pubDate).toBeDefined();
    expect(articles[0].creator).toBeDefined();
    expect(articles[0].contentSnippet).toBeDefined();
    expect(articles[0].content).toBeDefined();
    expect(articles[0].guid).toBeDefined();
    expect(articles[0].read).toBeDefined();
    expect(articles[0].markedAsReadAt).toBeDefined();
  });
});

import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';
import fs from 'fs';
import path from 'path';
import nock from 'nock';

import testApp from '@mc/lib/tests/testExpressApp';

import feedsController from './feeds';
import Feed from '../models/Feed';
import Folder from '../models/Folder';
import fixture from '../fixtures/feeds';
import folderFixture from '../fixtures/folders';

describe('Feeds Controller', () => {
  let app: express.Application;
  let testRss: string;

  beforeAll(async (done) => {
    try {
      await sequelizeFixtures.loadFixtures(
        [folderFixture, fixture],
        { Folder, Feed }
      );

      app = await testApp.setupApp();
      app.use(feedsController.router);

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
    expect(feedsController).toBeDefined();
  });

  test('Getting all feeds works', async () => {
    const response: request.Response = await request(app)
      .get('/')
      .send();

    expect(response.status).toEqual(200);

    const feeds = response.body.feeds;

    expect(feeds).toBeDefined();
    expect(feeds[0].id).toBeDefined();
    expect(feeds[0].name).toBeDefined();
    expect(feeds[0].feedUrl).toBeDefined();
    expect(feeds[0].link).toBeDefined();
    expect(feeds[0].icon).toBeDefined();
    expect(feeds[0].folder).toBeDefined();
  });

  test('Creating a feed works', async () => {
    nock('https://www.historyrhymes.info/')
      .get('/feed')
      .reply(200, testRss);

    const response: request.Response = await request(app)
      .post('/')
      .send({
        name: 'History Rhymes',
        feedUrl: 'https://www.historyrhymes.info/feed',
        link: 'https://www.historyrhymes.info',
        icon: 'test',
        fkFolder: 1
      });

    expect(response.status).toEqual(200);

    const feed = response.body.feed;

    expect(feed).toBeDefined();
    expect(feed.id).toBeDefined();
    expect(feed.name).toBeDefined();
    expect(feed.feedUrl).toBeDefined();
    expect(feed.link).toBeDefined();
    expect(feed.icon).toBeDefined();

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

  test('Creating a feed with an invalid URL doesn\'t work', async () => {
    nock('https://www.historyrhymes.info/')
      .get('/')
      .reply(200, {});

    const response: request.Response = await request(app)
      .post('/')
      .send({
        name: 'History Rhymes',
        feedUrl: 'https://www.historyrhymes.info/',
        link: 'https://www.historyrhymes.info',
        icon: 'test',
        fkFolder: 1
      });

    expect(response.status).toEqual(406);
  });

  test('Updating a feed works', async () => {
    const newName = 'New Name';

    const response: request.Response = await request(app)
      .put('/1')
      .send({
        name: newName
      });

    expect(response.status).toEqual(200);

    const feed = response.body.feed;

    expect(feed).toBeDefined();
    expect(feed.id).toBeDefined();
    expect(feed.name).toEqual(newName);
    expect(feed.feedUrl).toBeDefined();
    expect(feed.link).toBeDefined();
    expect(feed.icon).toBeDefined();
  });

  test('Updating a feed with an invalid URL doesn\'t work', async () => {
    nock('https://www.historyrhymes.info/')
      .get('/')
      .reply(200, {});

    const response: request.Response = await request(app)
      .put('/1')
      .send({
        feedUrl: 'https://www.historyrhymes.info/'
      });

    expect(response.status).toEqual(406);
  });

  test('Deleting a feed works', async () => {
    const response: request.Response = await request(app)
      .delete('/1')
      .send();

    expect(response.status).toEqual(204);
  });
});

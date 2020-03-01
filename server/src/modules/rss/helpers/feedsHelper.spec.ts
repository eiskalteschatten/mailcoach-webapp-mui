import sequelizeFixtures from 'sequelize-fixtures';
import fs from 'fs';
import path from 'path';
import nock from 'nock';

import usersFixture from '@mc/modules/auth/fixtures/users';
import User from '@mc/modules/auth/models/User';

import Feed from '../models/Feed';

import {
  refreshAllFeeds,
  refreshForSingleFeed,
  validateRssUrl
} from './feedsHelper';

describe('Feeds Helper', () => {
  let feed: Feed;
  let testRss: string;

  beforeAll(async (done): Promise<void> => {
    await sequelizeFixtures.loadFixtures(
      [usersFixture],
      { User }
    );

    feed = await Feed.create({
      name: 'History Rhymes',
      feedUrl: 'https://www.historyrhymes.info/feed',
      link: 'https://www.historyrhymes.info',
      icon: '',
      fkUser: 1
    });

    fs.readFile(path.resolve(__dirname, '../../../../tests/rss.xml'), 'utf8', (error: Error, data: any): void => {
      if (error) {
        done(error);
      }
      testRss = data;
      done();
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('Refreshing all feeds works', async (done) => {
    nock('https://www.historyrhymes.info/')
      .get('/feed')
      .reply(200, testRss);

    const articles = await refreshAllFeeds(1);

    expect(articles).toBeDefined();
    expect(articles[0].title).toBeDefined();
    expect(articles[0].link).toBeDefined();
    expect(articles[0].pubDate).toBeDefined();
    expect(articles[0].creator).toBeDefined();
    expect(articles[0].contentSnippet).toBeDefined();
    expect(articles[0].content).toBeDefined();
    expect(articles[0].guid).toBeDefined();
    expect(articles[0].read).toBeDefined();
    expect(articles[0].markedAsReadAt).toBeDefined();
    expect(articles[0].fkFeed).toBeDefined();

    done();
  });

  test('Refreshing a single feed works', async (done) => {
    nock('https://www.historyrhymes.info/')
      .get('/feed')
      .reply(200, testRss);

    const result = await refreshForSingleFeed(feed.id, 1);

    const parsedFeed = result.parsedFeed;

    expect(parsedFeed).toBeDefined();
    expect(parsedFeed.items).toBeDefined();
    expect(parsedFeed.feedUrl).toBeDefined();
    expect(parsedFeed.title).toBeDefined();
    expect(parsedFeed.description).toBeDefined();
    expect(parsedFeed.generator).toBeDefined();
    expect(parsedFeed.link).toBeDefined();
    expect(parsedFeed.language).toBeDefined();
    expect(parsedFeed.lastBuildDate).toBeDefined();

    const articles = result.articles;


    expect(articles).toBeDefined();
    expect(articles[0]).toBeUndefined();  // Undefined because the article has already been "read" by the test above

    done();
  });

  test('Validating a feed works', async (done) => {
    nock('https://www.historyrhymes.info/')
      .get('/feed')
      .reply(200, testRss);

    const parsedFeed = await validateRssUrl('https://www.historyrhymes.info/feed');

    expect(parsedFeed).toBeDefined();
    expect(parsedFeed.items).toBeDefined();
    expect(parsedFeed.feedUrl).toBeDefined();
    expect(parsedFeed.title).toBeDefined();
    expect(parsedFeed.description).toBeDefined();
    expect(parsedFeed.generator).toBeDefined();
    expect(parsedFeed.link).toBeDefined();
    expect(parsedFeed.language).toBeDefined();
    expect(parsedFeed.lastBuildDate).toBeDefined();

    done();
  });
});

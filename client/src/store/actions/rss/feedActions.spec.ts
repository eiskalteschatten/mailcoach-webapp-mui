import { MockStore } from 'redux-mock-store';
import nock from 'nock';

import {
  feedSetAll,
  feedGetFeedsAndFolders,
  feedAddFeed,
  feedUpdateFeed,
  feedDeleteFeed
} from './feedActions';

import mockStore from '../../../lib/tests/mockStore';

describe('RSS Feed Actions', () => {
  test('Setting all feeds works', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(feedSetAll([]));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({
      type: 'FEED_SET_ALL',
      feeds: []
    });
  });

  test('Getting all feeds and folders works', async () => {
    nock('http://localhost')
      .get('/api/rss/feeds/folders')
      .reply(200, {
        feeds: [],
        folders: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(feedGetFeedsAndFolders() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FEED_SET_ALL',
      feeds: []
    });
    expect(actions[3]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[4]).toEqual({
      type: 'FOLDER_CHECKED_FOR_FOLDERS',
      checkedForFolders: true
    });
    expect(actions[5]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Adding a feed works', async () => {
    nock('http://localhost')
      .post('/api/rss/feeds')
      .reply(200, {
        feed: {}
      });

    nock('http://localhost')
      .get('/api/rss/feeds/folders')
      .reply(200, {
        feeds: [],
        folders: []
      });

    nock('http://localhost')
      .get('/api/rss/articles/unread')
      .reply(200, {
        articles: []
      });

    nock('http://localhost')
      .get('/api/rss/stats')
      .reply(200, {});

    const localStore: MockStore = mockStore();
    await localStore.dispatch(feedAddFeed({
      name: 'test',
      feedUrl: 'url',
      link: 'link',
      fkFolder: 1
    }) as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FEED_SET_ALL',
      feeds: []
    });
    expect(actions[3]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[4]).toEqual({
      type: 'ARTICLE_SET_ALL',
      articles: []
    });
    expect(actions[5]).toEqual({
      type: 'ARTICLE_SET_STATS',
      stats: {}
    });
    expect(actions[6]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Updating a feed works', async () => {
    nock('http://localhost')
      .put('/api/rss/feeds/1')
      .reply(200, {
        folder: {}
      });

    nock('http://localhost')
      .get('/api/rss/feeds/folders')
      .reply(200, {
        feeds: [],
        folders: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(feedUpdateFeed(1, {
      name: 'test',
      feedUrl: 'feedUrl'
    }) as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FEED_SET_ALL',
      feeds: []
    });
    expect(actions[3]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[4]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Deleting a feed works', async () => {
    nock('http://localhost')
      .delete('/api/rss/feeds/1')
      .reply(200, {
        folder: {}
      });

    nock('http://localhost')
      .get('/api/rss/feeds/folders')
      .reply(200, {
        folders: [],
        feeds: []
      });

    nock('http://localhost')
      .get('/api/rss/articles/unread')
      .reply(200, {
        articles: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(feedDeleteFeed(1) as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FEED_SET_ALL',
      feeds: []
    });
    expect(actions[3]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[4]).toEqual({
      type: 'ARTICLE_SET_ALL',
      articles: []
    });
    expect(actions[5]).toEqual({type: 'APP_STOP_LOADING'});
  });
});

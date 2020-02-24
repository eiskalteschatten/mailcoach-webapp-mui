import { MockStore } from 'redux-mock-store';
import nock from 'nock';

import {
  articleSetAll,
  articleGetAllUnread,
  articleRefreshAndGetAllUnread,
  articleGetAll,
  articleMarkReadUnread,
  articleMarkAllRead,
  articleGetStats
} from './articleActions';

import mockStore from '../../../lib/tests/mockStore';

describe('RSS Article Actions', () => {
  const stats = {
    unreadTotal: 1,
    unreadPerFeed: {
      '1': 2
    },
    unreadPerFolder: {
      '3': 4
    }
  };

  test('Setting all articles works', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(articleSetAll([]));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({
      type: 'ARTICLE_SET_ALL',
      articles: []
    });
  });

  test('Getting all unread articles works', async () => {
    nock('http://localhost')
      .get('/api/rss/articles/unread')
      .reply(200, {
        articles: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(articleGetAllUnread() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'ARTICLE_SET_ALL',
      articles: []
    });
    expect(actions[3]).toEqual({
      type: 'ARTICLE_SET_INITIAL_CHECK_OCCURRED',
      initialCheckOccurred: true
    });
    expect(actions[4]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Refreshing all feeds and getting all unread articles works', async () => {
    nock('http://localhost')
      .post('/api/rss/refresh')
      .reply(204);

    nock('http://localhost')
      .get('/api/rss/articles/unread')
      .reply(200, {
        articles: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(articleRefreshAndGetAllUnread() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'ARTICLE_SET_ALL',
      articles: []
    });
    expect(actions[3]).toEqual({
      type: 'ARTICLE_SET_INITIAL_CHECK_OCCURRED',
      initialCheckOccurred: true
    });
    expect(actions[4]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Getting all articles works', async () => {
    nock('http://localhost')
      .get('/api/rss/articles')
      .reply(200, {
        articles: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(articleGetAll() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'ARTICLE_SET_ALL',
      articles: []
    });
    expect(actions[3]).toEqual({
      type: 'ARTICLE_SET_INITIAL_CHECK_OCCURRED',
      initialCheckOccurred: true
    });
    expect(actions[4]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Marking an article as read or unread works', async () => {
    nock('http://localhost')
      .patch('/api/rss/articles/mark-read-unread/1')
      .reply(200, {
        articles: []
      });

    nock('http://localhost')
      .get('/api/rss/stats')
      .reply(200, stats);

    const localStore: MockStore = mockStore();
    await localStore.dispatch(articleMarkReadUnread(1, true) as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[1]).toEqual({
      type: 'ARTICLE_SET_STATS',
      stats
    });
    expect(actions[2]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Marking all articles as read works', async () => {
    nock('http://localhost')
      .patch('/api/rss/articles/mark-all-read')
      .reply(200, {
        articles: []
      });

    nock('http://localhost')
      .get('/api/rss/stats')
      .reply(200, stats);

    const localStore: MockStore = mockStore();
    await localStore.dispatch(articleMarkAllRead() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[1]).toEqual({
      type: 'ARTICLE_SET_ALL'
    });
    expect(actions[2]).toEqual({
      type: 'ARTICLE_SET_STATS',
      stats
    });
    expect(actions[3]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Getting article stats', async () => {
    nock('http://localhost')
      .get('/api/rss/stats')
      .reply(200, stats);

    const localStore: MockStore = mockStore();
    await localStore.dispatch(articleGetStats() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'ARTICLE_SET_STATS',
      stats
    });
    expect(actions[3]).toEqual({type: 'APP_STOP_LOADING'});
  });
});

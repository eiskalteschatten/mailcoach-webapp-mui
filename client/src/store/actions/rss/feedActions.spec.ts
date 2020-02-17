import { MockStore } from 'redux-mock-store';
import nock from 'nock';

import {
  feedSetAll,
  feedGetAll
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

  test('Getting all feeds works', async () => {
    nock('http://localhost')
      .get('/api/rss/feeds')
      .reply(200, {
        feeds: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(feedGetAll() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FEED_SET_ALL',
      feeds: []
    });
    expect(actions[3]).toEqual({type: 'APP_STOP_LOADING'});
  });
});

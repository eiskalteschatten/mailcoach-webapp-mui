import { MockStore } from 'redux-mock-store';
import nock from 'nock';

import {
  folderSetAll,
  folderGetAll
} from './folderActions';

import mockStore from '../../../lib/tests/mockStore';

describe('RSS Folder Actions', () => {
  test('Setting all folders works', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(folderSetAll([]));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
  });

  test('Getting all folders works', async () => {
    nock('http://localhost')
      .get('/api/rss/folders')
      .reply(200, {
        folders: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(folderGetAll() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[3]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Getting all folders with feeds works', async () => {
    nock('http://localhost')
      .get('/api/rss/folders/with-feeds')
      .reply(200, {
        folders: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(folderGetAll() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_FORM_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[3]).toEqual({type: 'APP_STOP_LOADING'});
  });
});

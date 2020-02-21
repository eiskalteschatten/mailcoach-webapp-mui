import { MockStore } from 'redux-mock-store';
import nock from 'nock';

import {
  folderSetAll,
  folderGetAll,
  folderGetAllWithFeeds,
  folderUpdateFolder,
  folderDeleteFolder
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
      type: 'APP_SET_ERROR',
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
    await localStore.dispatch(folderGetAllWithFeeds() as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[3]).toEqual({
      type: 'FOLDER_CHECKED_FOR_FOLDERS',
      checkedForFolders: true
    });
    expect(actions[4]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Updating a folder works', async () => {
    nock('http://localhost')
      .put('/api/rss/folders/1')
      .reply(200, {
        folder: {}
      });

    nock('http://localhost')
      .get('/api/rss/folders/with-feeds')
      .reply(200, {
        folders: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(folderUpdateFolder(1, { name: 'test' }) as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[3]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('Deleting a folder works', async () => {
    nock('http://localhost')
      .delete('/api/rss/folders/1')
      .reply(200, {
        folder: {}
      });

    nock('http://localhost')
      .get('/api/rss/folders/with-feeds')
      .reply(200, {
        folders: []
      });

    const localStore: MockStore = mockStore();
    await localStore.dispatch(folderDeleteFolder(1) as any);
    const actions = localStore.getActions();

    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
    expect(actions[1]).toEqual({
      type: 'APP_SET_ERROR',
      error: ''
    });
    expect(actions[2]).toEqual({
      type: 'FOLDER_SET_ALL',
      folders: []
    });
    expect(actions[3]).toEqual({type: 'APP_STOP_LOADING'});
  });
});

import { MockStore } from 'redux-mock-store';

import {
  appStartLoading,
  appStopLoading,
  appStopBooting,
  appSetError,
  appSetFormError,
  appToggleLeftDrawer
} from './appActions';

import mockStore from '../../lib/tests/mockStore';

describe('App Actions', () => {
  test('App loader is started', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appStartLoading());
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
  });

  test('App loader is stopped', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appStopLoading());
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_STOP_LOADING'});
  });

  test('App booting is stopped', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appStopBooting());
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_STOP_BOOTING'});
  });

  test('Error is set', async () => {
    const error = 'Imanerror';
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appSetError(error));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_SET_ERROR', error});
  });

  test('Form error is set', async () => {
    const error = 'Imanerror';
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appSetFormError(error));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_SET_FORM_ERROR', error});
  });

  test('Toggling the left drawer works', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appToggleLeftDrawer(false));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({
      type: 'APP_TOGGLE_LEFT_DRAWER',
      leftDrawerOpen: false
    });
  });
});

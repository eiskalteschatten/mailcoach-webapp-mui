import { MockStore } from 'redux-mock-store';

import {
  appStartLoading,
  appStopLoading,
  appStopBooting,
  appSetError,
  appSetFormError
} from './appActions';

import mockStore from '../../lib/tests/mockStore';

describe('App Actions', () => {
  it('App loader is started', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appStartLoading());
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_START_LOADING'});
  });

  it('App loader is stopped', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appStopLoading());
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_STOP_LOADING'});
  });

  it('App booting is stopped', async () => {
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appStopBooting());
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_STOP_BOOTING'});
  });

  it('Error is set', async () => {
    const error = 'Imanerror';
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appSetError(error));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_SET_ERROR', error});
  });

  it('Form error is set', async () => {
    const error = 'Imanerror';
    const localStore: MockStore = mockStore();
    await localStore.dispatch(appSetFormError(error));
    const actions = localStore.getActions();
    expect(actions[0]).toEqual({type: 'APP_SET_FORM_ERROR', error});
  });
});

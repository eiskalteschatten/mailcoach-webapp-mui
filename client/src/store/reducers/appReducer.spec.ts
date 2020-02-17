import appReducer, { initialState } from './appReducer';
import { AppActions } from '../actions/appActions';

describe('App Reducer', () => {
  test('Should return the initial state', () => {
    expect(appReducer(undefined, {} as AppActions)).toEqual(initialState);
  })

  test('Should handle APP_START_LOADING', () => {
    expect(
      appReducer(undefined, { type: 'APP_START_LOADING' })
    ).toEqual({
      ...initialState,
      isLoading: true
    })
  })

  test('Should handle APP_STOP_LOADING', () => {
    expect(
      appReducer(undefined, { type: 'APP_STOP_LOADING' })
    ).toEqual({
      ...initialState,
      isLoading: false
    })
  })

  test('Should handle APP_STOP_BOOTING', () => {
    expect(
      appReducer(undefined, { type: 'APP_STOP_BOOTING' })
    ).toEqual({
      ...initialState,
      isBooting: false
    })
  })

  test('Should handle APP_SET_ERROR', () => {
    const error = 'Imanerror';
    expect(
      appReducer(undefined, { type: 'APP_SET_ERROR', error })
    ).toEqual({
      ...initialState,
      error: error
    })
  })

  test('Should handle APP_SET_FORM_ERROR', () => {
    const error = 'Imanerror';
    expect(
      appReducer(undefined, { type: 'APP_SET_FORM_ERROR', error })
    ).toEqual({
      ...initialState,
      formError: error
    })
  })

  test('Should handle APP_TOGGLE_LEFT_DRAWER', () => {
    expect(
      appReducer(undefined, {
        type: 'APP_TOGGLE_LEFT_DRAWER',
        leftDrawerOpen: false
      })
    ).toEqual({
      ...initialState,
      leftDrawerOpen: false
    })
  })
});

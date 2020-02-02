import appReducer, { initialState } from './appReducer';
import { AppActions } from '../actions/appActions';

describe('App Reducer', () => {
  it('Should return the initial state', () => {
    expect(appReducer(undefined, {} as AppActions)).toEqual(initialState);
  })

  it('Should handle APP_START_LOADING', () => {
    expect(
      appReducer(undefined, { type: 'APP_START_LOADING' })
    ).toEqual({
      ...initialState,
      isLoading: true
    })
  })

  it('Should handle APP_STOP_LOADING', () => {
    expect(
      appReducer(undefined, { type: 'APP_STOP_LOADING' })
    ).toEqual({
      ...initialState,
      isLoading: false
    })
  })

  it('Should handle APP_STOP_BOOTING', () => {
    expect(
      appReducer(undefined, { type: 'APP_STOP_BOOTING' })
    ).toEqual({
      ...initialState,
      isBooting: false
    })
  })

  it('Should handle APP_SET_ERROR', () => {
    const error = 'Imanerror';
    expect(
      appReducer(undefined, { type: 'APP_SET_ERROR', error })
    ).toEqual({
      ...initialState,
      error: error
    })
  })

  it('Should handle APP_SET_FORM_ERROR', () => {
    const error = 'Imanerror';
    expect(
      appReducer(undefined, { type: 'APP_SET_FORM_ERROR', error })
    ).toEqual({
      ...initialState,
      formError: error
    })
  })
});

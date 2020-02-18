import { SerializedModel } from '../../../../interfaces/auth/Users';

import userReducer, { initialState } from './userReducer';
import { UserActions } from '../actions/userActions';

describe('User Reducer', () => {
  test('Should return the initial state', () => {
    expect(userReducer(undefined, {} as UserActions)).toEqual(initialState);
  });

  test('Should handle USER_SET_INFO', () => {
    const user: SerializedModel = {
      id: 1,
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      email: 'email',
      avatar: ''
    };

    expect(
      userReducer(undefined, { type: 'USER_SET_INFO', user })
    ).toEqual({
      ...initialState,
      user
    })
  });

  test('Should handle USER_LOG_IN', () => {
    expect(
      userReducer(undefined, { type: 'USER_LOG_IN' })
    ).toEqual({
      ...initialState,
      jwtValidated: true
    })
  });

  test('Should handle USER_LOG_OUT', () => {
    expect(
      userReducer(undefined, { type: 'USER_LOG_OUT' })
    ).toEqual(initialState)
  });

  test('Should handle USER_SET_INSTANCE_ID', () => {
    const instanceId = 'test';

    expect(
      userReducer(undefined, { type: 'USER_SET_INSTANCE_ID', instanceId })
    ).toEqual({
      ...initialState,
      instanceId
    })
  });

  test('Should handle USER_SET_SETTINGS', () => {
    const settings = {
      language: 'en',
      theme: 'light'
    };

    expect(
      userReducer(undefined, { type: 'USER_SET_SETTINGS', settings })
    ).toEqual({
      ...initialState,
      settings
    })
  });
});

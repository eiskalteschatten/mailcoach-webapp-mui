import { SerializedModel } from '../../../../interfaces/Users';

import userReducer, { initialState, UserSessions } from './userReducer';
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

  test('Should handle USER_SET_SESSIONS', () => {
    const sessions: UserSessions[] = [{
      loginDate: new Date(),
      instanceId: 'test'
    }];

    expect(
      userReducer(undefined, { type: 'USER_SET_SESSIONS', sessions })
    ).toEqual({
      ...initialState,
      sessions
    })
  });
});

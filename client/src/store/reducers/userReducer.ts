import { Reducer } from 'redux';

import { SerializedModel } from '../../../../interfaces/Users';
import { SerializedModel as SerializedModelSettings } from '../../../../interfaces/UserSettings';

import { UserActions } from '../actions/userActions';

export interface UserSessions {
  loginDate: Date;
  instanceId: string;
}

export interface UserState {
  user: SerializedModel;
  jwtValidated: false;
  instanceId: string;
  sessions: UserSessions[];
  settings: SerializedModelSettings;
};

export const initialState: UserState = {
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    avatar: ''
  },
  jwtValidated: false,
  instanceId: '',
  sessions: [],
  settings: {
    language: 'en',
    theme: 'light'
  }
};

const userReducer: Reducer<UserState, UserActions> = (
  state: UserState = initialState,
  action: UserActions
): any => {
  switch (action.type) {
    case 'USER_SET_INFO':
      return {
        ...state,
        user: action.user
      };
    case 'USER_LOG_IN':
      return {
        ...state,
        jwtValidated: true
      };
    case 'USER_LOG_OUT':
      return initialState;
    case 'USER_SET_INSTANCE_ID':
      return {
        ...state,
        instanceId: action.instanceId
      };
    case 'USER_SET_SESSIONS':
      return {
        ...state,
        sessions: action.sessions
      };
    case 'USER_SET_SETTINGS':
      return {
        ...state,
        settings: action.settings
      };
    default:
      return state;
  }
};

export default userReducer;

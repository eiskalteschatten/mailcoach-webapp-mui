import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SerializedModel, ModelCreateUpdate, LoginModel } from '../../../../interfaces/Users';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetFormError } from './appActions';

export interface UserSetInfo extends Action<'USER_SET_INFO'> {
  user: SerializedModel
}
export interface UserLogin extends Action<'USER_LOG_IN'> {}
export interface UserLogout extends Action<'USER_LOG_OUT'> {}

export type UserActions = UserSetInfo | UserLogin | UserLogout;

export const userSetInfo = (user: SerializedModel): UserSetInfo => ({
  type: 'USER_SET_INFO',
  user
});

export const userLogin = (): UserLogin => ({ type: 'USER_LOG_IN' });
export const userLogout = (): UserLogout => ({ type: 'USER_LOG_OUT' });


// See https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/ for more on the return type
export const registerUser: ActionCreator<
  ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<AppStopLoadingAction>,
    // The type for the data within the last action
    null,
    // The type of the parameter for the nested function
    null,
    // The type of the last action to be dispatched
    AppStopLoadingAction
  >
> = (user: ModelCreateUpdate): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.post('/api/auth/users', user);
    dispatch(userSetInfo(res.data.user));
    dispatch(userLogin());
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
  }
  catch (error) {
    if (error.response.status === 409) {
      dispatch(appSetFormError('errors.usernameAlreadyExists'));
    }
    else if (error.response.status === 400) {
      dispatch(appSetFormError('errors.requiredFieldsMissing'));
    }
    else {
      dispatch(appSetFormError('errors.registrationError'));
      console.error(error);
    }
  }

  return dispatch(appStopLoading());
};

export const loginUser: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (user: LoginModel): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.post('/api/auth/login', user);
    dispatch(userSetInfo(res.data.user));
    dispatch(userLogin());
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
  }
  catch (error) {
    dispatch(appSetFormError('errors.loginError'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const renewAccessToken: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());

  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const res: any = await axios.post('/api/auth/token', {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });

    if (res.status === 200 && res.data && res.data.user) {
      dispatch(userSetInfo(res.data.user));
      dispatch(userLogin());
    }
  }
  catch (error) {
    console.error(error);
    dispatch(userLogout());
  }

  return dispatch(appStopLoading());
};

export const logoutUser: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());

  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const res: any = await axios.post('/api/auth/logout', {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });

    if (res.status === 204) {
      dispatch(userLogout());
    }
  }
  catch (error) {
    console.error(error);
    dispatch(userLogout());
  }

  return dispatch(appStopLoading());
};

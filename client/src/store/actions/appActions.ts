import { Action } from 'redux';

export interface AppStartLoadingAction extends Action<'APP_START_LOADING'> {}
export interface AppStopLoadingAction extends Action<'APP_STOP_LOADING'> {}
export interface AppStopBootingAction extends Action<'APP_STOP_BOOTING'> {}
export interface AppSetErrorAction extends Action<'APP_SET_ERROR'> {
  error: string;
}

export interface AppSetFromErrorAction extends Action<'APP_SET_FORM_ERROR'> {
  error: string;
}

export type AppActions =
  AppStartLoadingAction |
  AppStopLoadingAction |
  AppStopBootingAction |
  AppSetErrorAction |
  AppSetFromErrorAction;

export const appStartLoading = (): AppStartLoadingAction => ({ type: 'APP_START_LOADING' });
export const appStopLoading = (): AppStopLoadingAction => ({ type: 'APP_STOP_LOADING' });
export const appStopBooting = (): AppStopBootingAction => ({ type: 'APP_STOP_BOOTING' });
export const appSetError = (error: string): AppSetErrorAction => ({ type: 'APP_SET_ERROR', error });
export const appSetFormError = (error: string): AppSetFromErrorAction => ({ type: 'APP_SET_FORM_ERROR', error });

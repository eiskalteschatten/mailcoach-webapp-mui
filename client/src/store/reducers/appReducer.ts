import { Reducer } from 'redux';
import { AppActions } from '../actions/appActions';

export interface AppState {
  isLoading: boolean;
  isBooting: boolean;
  error: string;
  formError: string;
  leftDrawerOpen: boolean;
}

const smallUpMediaQuery = window.matchMedia('(min-width: 600px)');

export const initialState: AppState = {
  isLoading: false,
  isBooting: true,
  error: '',
  formError: '',
  leftDrawerOpen: smallUpMediaQuery.matches
};

const appReducer: Reducer<AppState, AppActions> = (
  state: AppState = initialState,
  action: AppActions
): any => {
  switch (action.type) {
    case 'APP_START_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'APP_STOP_LOADING':
      return {
        ...state,
        isLoading: false
      };
    case 'APP_STOP_BOOTING':
      return {
        ...state,
        isBooting: false
      };
    case 'APP_SET_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'APP_SET_FORM_ERROR':
      return {
        ...state,
        formError: action.error
      };
    case 'APP_TOGGLE_LEFT_DRAWER':
      return {
        ...state,
        leftDrawerOpen: action.leftDrawerOpen
      };
    default:
      return state;
  }
};

export default appReducer;

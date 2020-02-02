import { Reducer } from 'redux';
import { AppActions } from '../actions/appActions';

export interface AppState {
  isLoading: boolean;
  isBooting: boolean;
  error: string;
  formError: string;
}

export const initialState: AppState = {
  isLoading: false,
  isBooting: true,
  error: '',
  formError: ''
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
    default:
      return state;
  }
};

export default appReducer;

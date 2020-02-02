import axios from 'axios';

import { dispatch } from './store';
import { appStopBooting } from './store/actions/appActions';

export default async (): Promise<void> => {
  axios.interceptors.request.use((config: any): any => {
    const token = btoa(process.env.REACT_APP_BASIC_AUTH_USERNAME + ":" + process.env.REACT_APP_BASIC_AUTH_PASSWORD);
    config.headers.Authorization = `Basic ${token}`;

    return config;
  }, (error: any): void => {
    Promise.reject(error);
    return;
  });

  await dispatch(appStopBooting());
};

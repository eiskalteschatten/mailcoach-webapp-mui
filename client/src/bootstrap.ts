import axios from 'axios';

import { dispatch } from './store';
import { appStopBooting } from './store/actions/appActions';

export default async (): Promise<void> => {
  axios.interceptors.request.use((config: any): any => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }, (error: any): void => {
    Promise.reject(error);
    return;
  });

  await dispatch(appStopBooting());
};

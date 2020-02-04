import axios from 'axios';

import { dispatch } from './store';
import { appStopBooting } from './store/actions/appActions';
import { renewAccessToken } from './store/actions/userActions';
import renewAccessTokenInterval from './lib/renewAccessTokenInterval';

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

  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    await dispatch(renewAccessToken());
    await renewAccessTokenInterval();
  }

  await dispatch(appStopBooting());
};

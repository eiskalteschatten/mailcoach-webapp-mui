import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SerializedModel as Feed } from '../../../../../interfaces/rss/Feed';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetError } from '../appActions';
import { folderSetAll, folderSetCheckedForFolders } from './folderActions';

export interface FeedSetAll extends Action<'FEED_SET_ALL'> {
  feeds: Feed[];
}

export type FeedActions = FeedSetAll;

export const feedSetAll = (feeds: Feed[]): FeedSetAll => ({
  type: 'FEED_SET_ALL',
  feeds
});

export const feedGetAll: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    const res: any = await axios.get('/api/rss/feeds');
    dispatch(feedSetAll(res.data.feeds));
  }
  catch (error) {
    dispatch(appSetError('errors.anErrorOccurred'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const feedGetFeedsAndFolders: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    const res: any = await axios.get('/api/rss/feeds/folders');
    dispatch(feedSetAll(res.data.feeds));
    dispatch(folderSetAll(res.data.folders));
    dispatch(folderSetCheckedForFolders(true));
  }
  catch (error) {
    dispatch(appSetError('errors.anErrorOccurred'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

interface AddFeed {
  name: string;
  feedUrl: string;
  link: string;
  fkFolder: number;
}

export const feedAddFeed: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (data: AddFeed): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    await axios.post('/api/rss/feeds', data);
    const res: any = await axios.get('/api/rss/feeds/folders');
    dispatch(feedSetAll(res.data.feeds));
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    if (error.response.status === 406) {
      dispatch(appSetError('rssFeed.errors.invalidFeedUrl'));
    }
    else {
      dispatch(appSetError('errors.anErrorOccurred'));
      console.error(error);
    }
  }

  return dispatch(appStopLoading());
};

interface UpdateFeed {
  name: string;
  feedUrl: string;
}

export const feedUpdateFeed: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (id: number, data: UpdateFeed): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    await axios.put(`/api/rss/feeds/${id}`, data);
    const res: any = await axios.get('/api/rss/feeds/folders');
    dispatch(feedSetAll(res.data.feeds));
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    if (error.response.status === 406) {
      dispatch(appSetError('rssFeed.errors.invalidFeedUrl'));
    }
    else {
      dispatch(appSetError('errors.anErrorOccurred'));
      console.error(error);
    }
  }

  return dispatch(appStopLoading());
};

export const feedDeleteFeed: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (id: number): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    await axios.delete(`/api/rss/feeds/${id}`);
    const res: any = await axios.get('/api/rss/folders/with-feeds');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetError('errors.anErrorOccurred'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

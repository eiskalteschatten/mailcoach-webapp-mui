import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SerializedModel as Feed } from '../../../../../interfaces/rss/Feed';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetFormError } from '../appActions';

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
> = (feeds: Feed[]): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.get('/api/feed');
    dispatch(feedSetAll(res.data.feeds));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all feeds.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

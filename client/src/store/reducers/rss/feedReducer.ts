import { Reducer } from 'redux';
import { FeedActions } from '../../actions/rss/feedActions';

import { SerializedModel as Feed } from '../../../../../interfaces/rss/Feed';

export interface FeedState {
  feeds: Feed[];
}

export const initialState: FeedState = {
  feeds: []
};

const feedReducer: Reducer<FeedState, FeedActions> = (
  state: FeedState = initialState,
  action: FeedActions
): any => {
  switch (action.type) {
    case 'FEED_SET_ALL':
      return {
        ...state,
        feeds: action.feeds
      };
    default:
      return state;
  }
};

export default feedReducer;

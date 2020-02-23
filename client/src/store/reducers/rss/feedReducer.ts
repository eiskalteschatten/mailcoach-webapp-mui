import { Reducer } from 'redux';
import { FeedActions } from '../../actions/rss/feedActions';

import { SerializedModel as Feed } from '../../../../../interfaces/rss/Feed';

export interface FeedState {
  feeds: Feed[];
  selectedFeedId?: number;
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
    case 'FEED_SET_SELECTED_FEED_ID':
      return {
        ...state,
        selectedFeedId: action.selectedFeedId
      };
    default:
      return state;
  }
};

export default feedReducer;

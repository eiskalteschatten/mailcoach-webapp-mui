import feedReducer, { initialState } from './feedReducer';
import { FeedActions } from '../../actions/rss/feedActions';

describe('RSS Feed Reducer', () => {
  test('Should return the initial state', () => {
    expect(feedReducer(undefined, {} as FeedActions)).toEqual(initialState);
  })

  test('Should handle FEED_SET_ALL', () => {
    expect(
      feedReducer(undefined, {
        type: 'FEED_SET_ALL',
        feeds: []
      })
    ).toEqual({
      ...initialState,
      feeds: []
    })
  })

  test('Should handle FEED_SET_SELECTED_FEED_ID', () => {
    expect(
      feedReducer(undefined, {
        type: 'FEED_SET_SELECTED_FEED_ID',
        selectedFeedId: 1
      })
    ).toEqual({
      ...initialState,
      selectedFeedId: 1
    })
  });
});

import { combineReducers } from 'redux';

import article, { ArticleState } from './articleReducer';
import feed, { FeedState } from './feedReducer';
import folder, { FolderState } from './folderReducer';

export default combineReducers({
  article,
  feed,
  folder
});

export interface RssState {
  article: ArticleState;
  feed: FeedState;
  folder: FolderState;
}

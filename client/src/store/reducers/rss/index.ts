import { combineReducers } from 'redux';

import articleReducer, { ArticleState } from './articleReducer';
import feedReducer, { FeedState } from './feedReducer';
import folderReducer, { FolderState } from './folderReducer';

export default combineReducers({
  articleReducer,
  feedReducer,
  folderReducer
});

export interface RssState {
  article: ArticleState;
  feed: FeedState;
  folder: FolderState;
}

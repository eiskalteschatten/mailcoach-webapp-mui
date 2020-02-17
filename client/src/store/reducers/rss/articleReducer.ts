import { Reducer } from 'redux';
import { ArticleActions } from '../../actions/rss/articleActions';

import { SerializedModel as Article } from '../../../../../interfaces/rss/Article';

export interface ArticleState {
  articles: Article[];
  selectedArticleIndex?: number;
  dialogOpen: boolean;
}

export const initialState: ArticleState = {
  articles: [],
  dialogOpen: false
};

const articleReducer: Reducer<ArticleState, ArticleActions> = (
  state: ArticleState = initialState,
  action: ArticleActions
): any => {
  switch (action.type) {
    case 'ARTICLE_SET_ALL':
      return {
        ...state,
        articles: action.articles
      };
    case 'ARTICLE_TOGGLE_DIALOG':
      return {
        ...state,
        dialogOpen: action.dialogOpen
      };
    case 'ARTICLE_SET_SELECTED_INDEX':
      return {
        ...state,
        selectedArticleIndex: action.selectedArticleIndex
      };
    default:
      return state;
  }
};

export default articleReducer;

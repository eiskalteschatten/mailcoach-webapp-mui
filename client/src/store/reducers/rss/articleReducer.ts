import { Reducer } from 'redux';
import { ArticleActions } from '../../actions/rss/articleActions';

import { SerializedModel as Article } from '../../../../../interfaces/rss/Article';

export interface ArticleState {
  articles: Article[];
  selectedArticleIndex?: number;
  initialCheckOccurred: boolean;
}

export const initialState: ArticleState = {
  articles: [],
  initialCheckOccurred: false
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
    case 'ARTICLE_SET_SELECTED_INDEX':
      return {
        ...state,
        selectedArticleIndex: action.selectedArticleIndex
      };
    case 'ARTICLE_SET_INITIAL_CHECK_OCCURRED':
      return {
        ...state,
        initialCheckOccurred: action.initialCheckOccurred
      };
    default:
      return state;
  }
};

export default articleReducer;

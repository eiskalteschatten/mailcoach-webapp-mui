import { Reducer } from 'redux';
import { ArticleActions } from '../../actions/rss/articleActions';

import { SerializedModel as Article, ArticleStats } from '../../../../../interfaces/rss/Article';

export interface ArticleState {
  articles: Article[];
  initialCheckOccurred: boolean;
  stats?: ArticleStats;
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
    case 'ARTICLE_SET_INITIAL_CHECK_OCCURRED':
      return {
        ...state,
        initialCheckOccurred: action.initialCheckOccurred
      };
    case 'ARTICLE_SET_STATS':
        return {
          ...state,
          stats: action.stats
        };
    default:
      return state;
  }
};

export default articleReducer;

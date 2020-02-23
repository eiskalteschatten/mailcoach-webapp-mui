import articleReducer, { initialState } from './articleReducer';
import { ArticleActions } from '../../actions/rss/articleActions';

describe('RSS Article Reducer', () => {
  test('Should return the initial state', () => {
    expect(articleReducer(undefined, {} as ArticleActions)).toEqual(initialState);
  })

  test('Should handle ARTICLE_SET_ALL', () => {
    expect(
      articleReducer(undefined, {
        type: 'ARTICLE_SET_ALL',
        articles: []
      })
    ).toEqual({
      ...initialState,
      articles: []
    })
  })

  test('Should handle ARTICLE_TOGGLE_DIALOG', () => {
    expect(
      articleReducer(undefined, {
        type: 'ARTICLE_TOGGLE_DIALOG',
        dialogOpen: false
      })
    ).toEqual({
      ...initialState,
      dialogOpen: false
    })
  })

  test('Should handle ARTICLE_SET_SELECTED_INDEX', () => {
    expect(
      articleReducer(undefined, {
        type: 'ARTICLE_SET_SELECTED_INDEX',
        selectedArticleIndex: 1
      })
    ).toEqual({
      ...initialState,
      selectedArticleIndex: 1
    })
  })

  test('Should handle ARTICLE_SET_INITIAL_CHECK_OCCURRED', () => {
    expect(
      articleReducer(undefined, {
        type: 'ARTICLE_SET_INITIAL_CHECK_OCCURRED',
        initialCheckOccurred: true
      })
    ).toEqual({
      ...initialState,
      initialCheckOccurred: true
    })
  })
});

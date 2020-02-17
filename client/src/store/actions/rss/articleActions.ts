import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SerializedModel as Article } from '../../../../../interfaces/rss/Article';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetFormError } from '../appActions';

export interface ArticleSetAll extends Action<'ARTICLE_SET_ALL'> {
  articles: Article[];
}

export interface ArticleOpenMobileDialog extends Action<'ARTICLE_OPEN_MOBILE_DIALOG'> {
  mobileDialogOpen: boolean;
}

export interface ArticleCloseMobileDialog extends Action<'ARTICLE_CLOSE_MOBILE_DIALOG'> {
  mobileDialogOpen: boolean;
}

export interface ArticleSetSelectedIndex extends Action<'ARTICLE_SET_SELECTED_INDEX'> {
  selectedArticleIndex: number;
}

export type ArticleActions =
  ArticleSetAll |
  ArticleOpenMobileDialog |
  ArticleCloseMobileDialog |
  ArticleSetSelectedIndex;

export const articleSetAll = (articles: Article[]): ArticleSetAll => ({
  type: 'ARTICLE_SET_ALL',
  articles
});

export const articleOpenMobileDialog = (): ArticleOpenMobileDialog => ({
  type: 'ARTICLE_OPEN_MOBILE_DIALOG',
  mobileDialogOpen: true
});

export const articleCloseMobileDialog = (): ArticleCloseMobileDialog => ({
  type: 'ARTICLE_CLOSE_MOBILE_DIALOG',
  mobileDialogOpen: false
});

export const articleSetSelectedIndex = (selectedArticleIndex: number): ArticleSetSelectedIndex => ({
  type: 'ARTICLE_SET_SELECTED_INDEX',
  selectedArticleIndex
});

export const articleGetAllUnread: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.get('/api/article/unread');
    dispatch(articleSetAll(res.data.articles));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all unread articles.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const articleRefreshAndGetAllUnread: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    await axios.post('/api/refresh');
    const res: any = await axios.get('/api/article/unread');
    dispatch(articleSetAll(res.data.articles));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while refreshing fetching all unread articles.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const articleGetAll: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.get('/api/article');
    dispatch(articleSetAll(res.data.articles));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all articles.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const articleMarkReadUnread: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (id: number, read: boolean): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  let loadingTimer: NodeJS.Timer;
  loadingTimer = setTimeout(() => dispatch(appStartLoading()), 1000);

  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.patch(`/api/article/mark-read-unread/${id}`, { read });

    const state = getState();
    const articles = Object.create(state.article.articles);
    const selectedArticleIndex = state.article.selectedArticleIndex;

    if (selectedArticleIndex !== undefined && selectedArticleIndex !== null) {
      articles[selectedArticleIndex] = res.data.article;
    }

    dispatch(articleSetAll(articles));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while marking an article as read or unread.'));
    console.error(error);
  }

  clearTimeout(loadingTimer);
  return dispatch(appStopLoading());
};

export const articleMarkAllRead: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  let loadingTimer: NodeJS.Timer;
  loadingTimer = setTimeout(() => dispatch(appStartLoading()), 1000);

  dispatch(appSetFormError(''));

  try {
    await axios.patch('/api/article/mark-all-read');

    const state = getState();
    const articles = Object.create(state.article.articles);

    for (const i in articles) {
      articles[i].read = true;
    }

    dispatch(articleSetAll(articles));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while marking all articles as read.'));
    console.error(error);
  }

  clearTimeout(loadingTimer);
  return dispatch(appStopLoading());
};

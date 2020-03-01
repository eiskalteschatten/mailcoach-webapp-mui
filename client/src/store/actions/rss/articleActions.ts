import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SerializedModel as Article, ArticleStats } from '../../../../../interfaces/rss/Article';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetFormError } from '../appActions';

export interface ArticleSetAll extends Action<'ARTICLE_SET_ALL'> {
  articles: Article[];
}

export interface ArticleSetInitialCheckOccurred extends Action<'ARTICLE_SET_INITIAL_CHECK_OCCURRED'> {
  initialCheckOccurred: boolean;
}

export interface ArticleSetStats extends Action<'ARTICLE_SET_STATS'> {
  stats: ArticleStats;
}

export interface ArticleSetShowUnread extends Action<'ARTICLE_SET_SHOW_UNREAD'> {
  showUnreadItems: boolean;
}

export type ArticleActions =
  ArticleSetAll |
  ArticleSetInitialCheckOccurred |
  ArticleSetStats |
  ArticleSetShowUnread;

export const articleSetAll = (articles: Article[]): ArticleSetAll => ({
  type: 'ARTICLE_SET_ALL',
  articles
});

export const articleSetInitialCheckOccurred = (initialCheckOccurred: boolean): ArticleSetInitialCheckOccurred => ({
  type: 'ARTICLE_SET_INITIAL_CHECK_OCCURRED',
  initialCheckOccurred
});

export const articleSetStats = (stats: ArticleStats): ArticleSetStats => ({
  type: 'ARTICLE_SET_STATS',
  stats
});

export const articleSetShowUnread = (showUnreadItems: boolean): ArticleSetShowUnread => ({
  type: 'ARTICLE_SET_SHOW_UNREAD',
  showUnreadItems
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
    const res: any = await axios.get('/api/rss/articles/unread');
    dispatch(articleSetAll(res.data.articles));
    dispatch(articleSetInitialCheckOccurred(true));
  }
  catch (error) {
    dispatch(appSetFormError('errors.anErrorOccurred'));
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
    await axios.post('/api/rss/refresh');
    const res: any = await axios.get('/api/rss/articles/unread');
    dispatch(articleSetAll(res.data.articles));
    dispatch(articleSetInitialCheckOccurred(true));
  }
  catch (error) {
    dispatch(appSetFormError('errors.anErrorOccurred'));
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
    const res: any = await axios.get('/api/rss/articles');
    dispatch(articleSetAll(res.data.articles));
    dispatch(articleSetInitialCheckOccurred(true));
  }
  catch (error) {
    dispatch(appSetFormError('errors.anErrorOccurred'));
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
    const res: any = await axios.patch(`/api/rss/articles/mark-read-unread/${id}`, { read });

    const state = getState();
    const articles = state.rss && state.rss.article && Object.create(state.rss.article.articles);

    if (articles) {
      for (const index in articles) {
        const article = articles[index];

        if (article.id === id) {
          articles[index] = res.data.article;
          dispatch(articleSetAll(articles));
          break;
        }
      }
    }

    const statsRes: any = await axios.get('/api/rss/stats');
    dispatch(articleSetStats(statsRes.data));
  }
  catch (error) {
    dispatch(appSetFormError('errors.anErrorOccurred'));
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
    await axios.patch('/api/rss/articles/mark-all-read');

    const state = getState();
    const articles = state.article && Object.create(state.article.articles);

    for (const i in articles) {
      articles[i].read = true;
    }

    dispatch(articleSetAll(articles));

    const statsRes: any = await axios.get('/api/rss/stats');
    dispatch(articleSetStats(statsRes.data));
  }
  catch (error) {
    dispatch(appSetFormError('errors.anErrorOccurred'));
    console.error(error);
  }

  clearTimeout(loadingTimer);
  return dispatch(appStopLoading());
};

export const articleGetStats: ActionCreator<
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
    const res: any = await axios.get('/api/rss/stats');
    dispatch(articleSetStats(res.data));
  }
  catch (error) {
    dispatch(appSetFormError('errors.anErrorOccurred'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

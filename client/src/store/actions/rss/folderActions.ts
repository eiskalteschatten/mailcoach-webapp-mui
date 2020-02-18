import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetFormError } from '../appActions';

export interface FolderSetAll extends Action<'FOLDER_SET_ALL'> {
  folders: Folder[];
}

export type FolderActions =
  FolderSetAll;

export const folderSetAll = (folders: Folder[]): FolderSetAll => ({
  type: 'FOLDER_SET_ALL',
  folders
});

export const folderGetAll: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (folders: Folder[]): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.get('/api/rss/folders');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all folders.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const folderGetAllWithFeeds: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (folders: Folder[]): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.get('/api/rss/folders/with-feeds');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all folders.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

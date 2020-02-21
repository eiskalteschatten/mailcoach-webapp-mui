import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetError } from '../appActions';

export interface FolderSetAll extends Action<'FOLDER_SET_ALL'> {
  folders: Folder[];
}

export interface FolderSetCheckedForFolders extends Action<'FOLDER_CHECKED_FOR_FOLDERS'> {
  checkedForFolders: boolean;
}

export type FolderActions =
  FolderSetAll |
  FolderSetCheckedForFolders;

  export const folderSetAll = (folders: Folder[]): FolderSetAll => ({
    type: 'FOLDER_SET_ALL',
    folders
  });

  export const folderSetCheckedForFolders = (checkedForFolders: boolean): FolderSetCheckedForFolders => ({
    type: 'FOLDER_CHECKED_FOR_FOLDERS',
    checkedForFolders
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
  dispatch(appSetError(''));

  try {
    const res: any = await axios.get('/api/rss/folders');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetError('An error occurred while fetching all folders.'));
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
> = (): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    const res: any = await axios.get('/api/rss/folders/with-feeds');
    dispatch(folderSetAll(res.data.folders));
    dispatch(folderSetCheckedForFolders(true));
  }
  catch (error) {
    dispatch(appSetError('An error occurred while fetching all folders.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

interface AddFolder {
  name: string;
}

export const folderAddFolder: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (data: AddFolder): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    await axios.post('/api/rss/folders', data);
    const res: any = await axios.get('/api/rss/folders/with-feeds');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetError('An error occurred while updating a folder.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

interface UpdateFolder {
  name: string;
}

export const folderUpdateFolder: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (id: number, data: UpdateFolder): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    await axios.put(`/api/rss/folders/${id}`, data);
    const res: any = await axios.get('/api/rss/folders/with-feeds');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetError('An error occurred while updating a folder.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const folderDeleteFolder: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (id: number): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetError(''));

  try {
    await axios.delete(`/api/rss/folders/${id}`);
    const res: any = await axios.get('/api/rss/folders/with-feeds');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetError('An error occurred while updating a folder.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

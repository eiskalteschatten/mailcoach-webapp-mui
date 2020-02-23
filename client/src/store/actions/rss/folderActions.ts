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

export interface FolderSetSelectedFolderId extends Action<'FOLDER_SET_SELECTED_FOLDER_ID'> {
  selectedFolderId: number | undefined;
}

export type FolderActions =
  FolderSetAll |
  FolderSetCheckedForFolders |
  FolderSetSelectedFolderId;

export const folderSetAll = (folders: Folder[]): FolderSetAll => ({
  type: 'FOLDER_SET_ALL',
  folders
});

export const folderSetCheckedForFolders = (checkedForFolders: boolean): FolderSetCheckedForFolders => ({
  type: 'FOLDER_CHECKED_FOR_FOLDERS',
  checkedForFolders
});

export const folderSetselectedFolderId = (selectedFolderId: number | undefined): FolderSetSelectedFolderId => ({
  type: 'FOLDER_SET_SELECTED_FOLDER_ID',
  selectedFolderId
});

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
    dispatch(appSetError('errors.anErrorOccurred'));
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
    dispatch(appSetError('errors.anErrorOccurred'));
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
    dispatch(appSetError('errors.anErrorOccurred'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

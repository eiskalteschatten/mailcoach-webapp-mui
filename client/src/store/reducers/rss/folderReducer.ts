import { Reducer } from 'redux';

import { RSS_UNREAD_ITEMS_FOLDER_ID } from '../../../constants';
import { FolderActions } from '../../actions/rss/folderActions';

import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

export interface FolderState {
  folders: Folder[];
  checkedForFolders: boolean;
  selectedFolderId?: number;
}

export const initialState: FolderState = {
  folders: [],
  checkedForFolders: false,
  selectedFolderId: RSS_UNREAD_ITEMS_FOLDER_ID
};

const folderReducer: Reducer<FolderState, FolderActions> = (
  state: FolderState = initialState,
  action: FolderActions
): any => {
  switch (action.type) {
    case 'FOLDER_SET_ALL':
      return {
        ...state,
        folders: action.folders
      };
    case 'FOLDER_CHECKED_FOR_FOLDERS':
      return {
        ...state,
        checkedForFolders: action.checkedForFolders
      };
    case 'FOLDER_SET_SELECTED_FOLDER_ID':
      return {
        ...state,
        selectedFolderId: action.selectedFolderId
      };
    default:
      return state;
  }
};

export default folderReducer;

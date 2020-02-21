import { Reducer } from 'redux';
import { FolderActions } from '../../actions/rss/folderActions';

import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

export interface FolderState {
  folders: Folder[];
  checkedForFolders: boolean;
}

export const initialState: FolderState = {
  folders: [],
  checkedForFolders: false
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
    default:
      return state;
  }
};

export default folderReducer;

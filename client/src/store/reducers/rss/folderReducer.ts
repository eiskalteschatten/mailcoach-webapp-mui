import { Reducer } from 'redux';
import { FolderActions } from '../../actions/rss/folderActions';

import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

export interface FolderState {
  folders: Folder[];
  drawerOpen: boolean;
}

export const initialState: FolderState = {
  folders: [],
  drawerOpen: false
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
    case 'FOLDER_OPEN_DRAWER':
      return {
        ...state,
        drawerOpen: true
      };
    case 'FOLDER_CLOSE_DRAWER':
      return {
        ...state,
        drawerOpen: false
      };
    default:
      return state;
  }
};

export default folderReducer;

import folderReducer, { initialState } from './folderReducer';
import { FolderActions } from '../../actions/rss/folderActions';

describe('RSS Folder Reducer', () => {
  test('Should return the initial state', () => {
    expect(folderReducer(undefined, {} as FolderActions)).toEqual(initialState);
  });

  test('Should handle FOLDER_SET_ALL', () => {
    expect(
      folderReducer(undefined, {
        type: 'FOLDER_SET_ALL',
        folders: []
      })
    ).toEqual({
      ...initialState,
      folders: []
    })
  });

  test('Should handle FOLDER_CHECKED_FOR_FOLDERS', () => {
    expect(
      folderReducer(undefined, {
        type: 'FOLDER_CHECKED_FOR_FOLDERS',
        checkedForFolders: true
      })
    ).toEqual({
      ...initialState,
      checkedForFolders: true
    })
  });

  test('Should handle FOLDER_SET_SELECTED_FOLDER_ID', () => {
    expect(
      folderReducer(undefined, {
        type: 'FOLDER_SET_SELECTED_FOLDER_ID',
        selectedFolderId: 1
      })
    ).toEqual({
      ...initialState,
      selectedFolderId: 1
    })
  });
});

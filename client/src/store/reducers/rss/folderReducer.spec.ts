import folderReducer, { initialState } from './folderReducer';
import { FolderActions } from '../../actions/rss/folderActions';

describe('RSS Folder Reducer', () => {
  test('Should return the initial state', () => {
    expect(folderReducer(undefined, {} as FolderActions)).toEqual(initialState);
  })

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
  })
});

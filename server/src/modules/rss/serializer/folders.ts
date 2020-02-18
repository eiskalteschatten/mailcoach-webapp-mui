import {
  FullFolder,
  SerializedModel,
  ModelCreateUpdate
} from '../interfaces/Folder';

import serializeFeed from './feeds';

export const serialize = (folder: FullFolder): SerializedModel => ({
  id: folder.id,
  name: folder.name,
  feeds: folder.feeds && folder.feeds.map(serializeFeed)
});

export default serialize;

export const deserializeModelCreateUpdate = (serializedData: ModelCreateUpdate): ModelCreateUpdate => ({
  name: serializedData.name
});

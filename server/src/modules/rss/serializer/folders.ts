import {
  DeserializedModel,
  SerializedModel,
  ModelCreateUpdate
} from '../interfaces/Folder';

export const serialize = (feed: DeserializedModel): SerializedModel => ({
  id: feed.id,
  name: feed.name
});

export default serialize;

export const deserializeModelCreateUpdate = (serializedData: ModelCreateUpdate): ModelCreateUpdate => ({
  name: serializedData.name
});

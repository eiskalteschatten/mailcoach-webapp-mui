import {
  DeserializedModel,
  SerializedModel,
  ModelCreateUpdate
} from '../interfaces/Feed';

export const serialize = (feed: DeserializedModel): SerializedModel => ({
  id: feed.id,
  name: feed.name,
  feedUrl: feed.feedUrl,
  link: feed.link,
  icon: feed.icon,
  fkFolder: feed.fkFolder
});

export default serialize;

export const deserializeModelCreateUpdate = (serializedData: ModelCreateUpdate): ModelCreateUpdate => ({
  name: serializedData.name,
  feedUrl: serializedData.feedUrl,
  link: serializedData.link,
  icon: serializedData.icon,
  fkFolder: serializedData.fkFolder
});

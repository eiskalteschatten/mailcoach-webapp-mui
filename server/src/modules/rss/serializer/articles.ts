import {
  DeserializedModel,
  SerializedModel,
  ModelCreateUpdate
} from '../interfaces/Article';

export const serialize = (article: DeserializedModel): SerializedModel => ({
  id: article.id,
  title: article.title,
  link: article.link,
  pubDate: article.pubDate,
  creator: article.creator,
  contentSnippet: article.contentSnippet,
  content: article.content,
  guid: article.guid,
  read: article.read,
  markedAsReadAt: article.markedAsReadAt,
  feed: article.feed
});

export default serialize;

export const deserializeModelCreateUpdate = (serializedData: ModelCreateUpdate): ModelCreateUpdate => ({
  title: serializedData.title,
  link: serializedData.link,
  pubDate: serializedData.pubDate,
  creator: serializedData.creator,
  contentSnippet: serializedData.contentSnippet,
  content: serializedData.content,
  guid: serializedData.guid,
  read: serializedData.read,
  markedAsReadAt: serializedData.markedAsReadAt,
  fkFeed: serializedData.fkFeed
});

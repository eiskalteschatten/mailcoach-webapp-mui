import {
  DeserializedModel as DeserializedModelFeed,
  SerializedModel as SerializedModelFeed
} from './Feed';

export interface DeserializedModel {
  id: number;
  title: string;
  link: string;
  pubDate: Date;
  creator: string;
  contentSnippet: string;
  content: string;
  guid: string;
  read: boolean;
  markedAsReadAt: Date;
  fkFeed: number;
  createdAt: Date;
  updatedAt: Date;
  feed?: DeserializedModelFeed;
}

export interface SerializedModel {
  id: number;
  title: string;
  link: string;
  pubDate: Date;
  creator: string;
  contentSnippet: string;
  content: string;
  guid: string;
  read: boolean;
  markedAsReadAt: Date;
  feed?: SerializedModelFeed;
}

export interface ModelCreateUpdate {
  title?: string;
  link?: string;
  pubDate?: Date;
  creator?: string;
  contentSnippet?: string;
  content?: string;
  guid?: string;
  read?: boolean;
  markedAsReadAt?: Date;
  fkFeed: number;
}

export interface ArticleStats {
  unreadTotal: number;
  unreadPerFeed: {
    [feedId: string]: number;
  };
  unreadPerFolder: {
    [folderId: string]: number;
  };
}

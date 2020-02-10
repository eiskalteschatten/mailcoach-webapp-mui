import Feed from './Feed';

export interface Article {
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
  feed?: Feed;
} // eslint-disable-line semi

export default interface Feed {
  id: number;
  name: string;
  feedUrl: string;
  link: string;
  icon: string;
  fkFolder: number;
  createdAt: Date;
  updatedAt: Date;
} // eslint-disable-line semi

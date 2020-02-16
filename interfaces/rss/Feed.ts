export interface SerializedFeedFolder {
  id: number;
  name: string;
}

export interface DeserializedModel {
  id: number;
  name: string;
  feedUrl: string;
  link: string;
  icon: string;
  fkFolder: number;
  folder?: SerializedFeedFolder;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerializedModel {
  id: number;
  name: string;
  feedUrl: string;
  link: string;
  icon: string;
  folder: SerializedFeedFolder;
}

export interface ModelCreateUpdate {
  name?: string;
  feedUrl?: string;
  link?: string;
  icon?: string;
  fkFolder: number;
}

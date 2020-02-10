export interface DeserializedModel {
  id: number;
  name: string;
  feedUrl: string;
  link: string;
  icon: string;
  fkFolder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerializedModel {
  id: number;
  name: string;
  feedUrl: string;
  link: string;
  icon: string;
  fkFolder: number;
}

export interface ModelCreateUpdate {
  name?: string;
  feedUrl?: string;
  link?: string;
  icon?: string;
  fkFolder: number;
}

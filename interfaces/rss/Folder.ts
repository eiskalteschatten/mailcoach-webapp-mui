import {
  DeserializedModel as DeserializedModelFeed,
  SerializedModel as SerializedModelFeed
} from './Feed';

export interface DeserializedModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerializedModel {
  id: number;
  name: string;
  feeds?: SerializedModelFeed[];
}

export interface ModelCreateUpdate {
  name?: string;
}

export interface FullFolder extends DeserializedModel {
  feeds?: DeserializedModelFeed[];
}

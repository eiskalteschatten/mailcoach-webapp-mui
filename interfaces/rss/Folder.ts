export interface DeserializedModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerializedModel {
  id: number;
  name: string;
}

export interface ModelCreateUpdate {
  name?: string;
}

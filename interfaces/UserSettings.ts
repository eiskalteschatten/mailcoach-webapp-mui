export interface SerializedModel {
  language: string;
  theme: string;
}

export interface ModelCreateUpdate {
  id?: number;
  language?: string;
  theme?: string;
}

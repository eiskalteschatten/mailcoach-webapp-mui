import UserSetting from '../models/UserSetting';

import {
  SerializedModel,
  ModelCreateUpdate
} from '../interfaces/UserSettings';

export const serialize = (settings: UserSetting): SerializedModel => ({
  language: settings.language,
  theme: settings.theme
});

export default serialize;

export const deserializeModelCreateUpdate = (serializedData: ModelCreateUpdate): ModelCreateUpdate => ({
  language: serializedData.language,
  theme: serializedData.theme
});

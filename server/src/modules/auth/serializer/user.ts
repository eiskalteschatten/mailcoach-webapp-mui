import User from '../models/User';

import {
  SerializedModel,
  ModelCreateUpdate
} from '../interfaces/User';

export const serialize = (user: User): SerializedModel => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  status: user.status,
  avatar: user.avatar
});

export default serialize;

export const deserializeModelCreateUpdate = (serializedData: ModelCreateUpdate): ModelCreateUpdate => ({
  username: serializedData.username,
  password: serializedData.password,
  firstName: serializedData.firstName,
  lastName: serializedData.lastName,
  email: serializedData.email,
  status: serializedData.status,
  avatar: serializedData.avatar
});

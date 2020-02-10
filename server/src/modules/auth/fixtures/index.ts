import users from './users';
import userSessions from './userSessions';
import userSettings from './userSettings';

export default {
  ...users,
  ...userSessions,
  ...userSettings
};

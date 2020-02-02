import UserSession from '../models/UserSession';
import User from '../models/User';

export interface UserSessionWithUser extends UserSession {
  user: User;
}

import config from 'config';

import logger from '@mc/logger';
import User from '@mc/modules/auth/models/User';
import UserService from '@mc/modules/auth/services/UserService';
import { ModelCreateUpdate } from '@mc/modules/auth/interfaces/User';
import { serialize } from '@mc/modules/auth/serializer/user';

export default async function(): Promise<void> {
  try {
    const randomUser = await User.findOne();

    if (randomUser) {
      logger.info('No initial user was created because at least one user already exists in the database!');
      return;
    }

    const initialUser = config.get<ModelCreateUpdate>('users.initialUser');

    const userService = new UserService();
    const user = await userService.register({
      ...initialUser,
      status: 'active'
    });

    logger.info('Initial user created:', serialize(user));
  }
  catch(error) {
    logger.error(error);
  }
}

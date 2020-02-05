import { Router } from 'express';
import path from 'path';

import Module from '@mc/interfaces/Module';
import AbstractModule from '@mc/modules/AbstractModule';

import authController from './controllers/auth';
import userController from './controllers/user';
import userAdminController from './controllers/userAdmin';
import sessionsController from './controllers/sessions';

export class AuthModule extends AbstractModule implements Module {
  protected modulePath: string = path.resolve(__dirname);
  entryRoute = '/auth';

  get router(): Router {
    const router = Router();

    router.use(`${this.entryRoute}/users/self`, userController.router);
    router.use(`${this.entryRoute}/users/sessions`, sessionsController.router);
    router.use(`${this.entryRoute}/users`, userAdminController.router);
    router.use(this.entryRoute, authController.router);

    return router;
  }
}

export default new AuthModule();

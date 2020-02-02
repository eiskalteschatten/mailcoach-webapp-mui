import { Router } from 'express';
import path from 'path';

import Module from '@mc/interfaces/Module';
import AbstractModule from '@mc/modules/AbstractModule';

import authController from './controllers/auth';

export class AuthModule extends AbstractModule implements Module {
  protected modulePath: string = path.resolve(__dirname);
  entryRoute = '/auth';

  get router(): Router {
    const router = Router();

    router.use(this.entryRoute, authController.router);

    return router;
  }
}

export default new AuthModule();

import { Router } from 'express';
import path from 'path';

import AbstractModule from '../AbstractModule';
import Module from '@mc/interfaces/Module';

// import writeController from './controller/write';

export class AuthModule extends AbstractModule implements Module {
  protected modulePath: string = path.resolve(__dirname);

  get entryRoute(): string {
    return 'auth';
  }

  get router(): Router {
    const router = Router();

    // router.use(writeController.router);

    return router;
  }
}

export default new AuthModule();

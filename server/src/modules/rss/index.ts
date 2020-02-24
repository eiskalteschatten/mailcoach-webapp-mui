import { Router } from 'express';
import path from 'path';

import Module from '@mc/interfaces/Module';
import AbstractModule from '@mc/modules/AbstractModule';

import articlesController from './controllers/articles';
import feedsController from './controllers/feeds';
import foldersController from './controllers/folders';
import refreshController from './controllers/refresh';
import statsController from './controllers/stats';

export class RssModule extends AbstractModule implements Module {
  protected modulePath: string = path.resolve(__dirname);
  entryRoute = '/rss';

  get router(): Router {
    const router = Router();

    router.use(`${this.entryRoute}/articles`, articlesController.router);
    router.use(`${this.entryRoute}/feeds`, feedsController.router);
    router.use(`${this.entryRoute}/folders`, foldersController.router);
    router.use(`${this.entryRoute}/refresh`, refreshController.router);
    router.use(`${this.entryRoute}/stats`, statsController.router);

    return router;
  }
}

export default new RssModule();

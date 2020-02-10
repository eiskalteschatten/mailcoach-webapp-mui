import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';

import { refreshAllFeeds, refreshForSingleFeed } from '../helpers/feedsHelper';

class RefreshController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.post('/', this.refreshAllFeeds);
    this.router.post('/:feedId', this.refreshSingleFeed);
  }

  private async refreshAllFeeds(req: Request, res: Response): Promise<void> {
    try {
      const articles = await refreshAllFeeds();
      res.json({ articles });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async refreshSingleFeed(req: Request, res: Response): Promise<void> {
    try {
      const feedId = parseInt(req.params.feedId);
      const refreshed = await refreshForSingleFeed(feedId);

      res.json({
        articles: refreshed.articles
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new RefreshController();

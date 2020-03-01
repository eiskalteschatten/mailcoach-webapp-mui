import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';
import authPassport from '@mc/lib/middleware/authPassport';
import User from '@mc/modules/auth/models/User';

import Folder from '../models/Folder';
import Feed from '../models/Feed';
import Article from '../models/Article';

class StatsController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', authPassport, this.getStats);
  }

  /**
   * @api {get} /api/rss/stats Get Stats
   * @apiName GetStats
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "unreadTotal": 57,
   *    "unreadPerFeed": {
   *      "1": 25,
   *      "2": 32
   *    },
   *    "unreadPerFolder": {
   *      "1": 25,
   *      "2": 32
   *    }
   *  }
   */

  private async getStats(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as User;

      const unreadArticles = await Article.findAll({
        where: {
          read: false,
          fkUser: user.id
        },
        include: [{
          model: Feed,
          as: 'feed',
          include: [{
            model: Folder,
            as: 'folder'
          }]
        }]
      });

      const unreadPerFeed = {};
      const unreadPerFolder = {};

      for (const article of unreadArticles) {
        const feed = article.feed;

        if (feed) {
          if (!unreadPerFeed[feed.id]) {
            unreadPerFeed[feed.id] = 0;
          }

          unreadPerFeed[feed.id] += 1;

          const folder = feed.folder;

          if (folder) {
            if (!unreadPerFolder[folder.id]) {
              unreadPerFolder[folder.id] = 0;
            }

            unreadPerFolder[folder.id] += 1;
          }
        }
      }

      res.json({
        unreadTotal: unreadArticles.length,
        unreadPerFeed,
        unreadPerFolder
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new StatsController();

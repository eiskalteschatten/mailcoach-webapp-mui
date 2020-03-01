import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';
import authPassport from '@mc/lib/middleware/authPassport';

import { refreshAllFeeds, refreshForSingleFeed } from '../helpers/feedsHelper';
import { serialize as serializeArticles } from '../serializer/articles';

class RefreshController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.post('/', authPassport, this.refreshAllFeeds);
    this.router.post('/:feedId', authPassport, this.refreshSingleFeed);
  }

  /**
   * @api {post} /api/rss/refresh Refresh All Feeds
   * @apiName RefreshAllFeeds
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
   *    "articles": [
   *      {
   *        "id": 1,
   *        "title": "",
   *        "link": "",
   *        "pubDate": "",
   *        "creator": "",
   *        "contentSnippet": "",
   *        "content": "",
   *        "guid": "",
   *        "read": false,
   *        "markedAsReadAt": "",
   *        "feed": {
   *          "id": 1,
   *          "name": "",
   *          "feedUrl": "",
   *          "link": "",
   *          "icon": "",
   *          "fkFolder": 1
   *        }
   *      }
   *    ]
   *  }
   */

  private async refreshAllFeeds(req: Request, res: Response): Promise<void> {
    try {
      const articles = await refreshAllFeeds();
      res.json({
        articles: articles.map(serializeArticles)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {post} /api/rss/refresh/:feedId Refresh A Feed
   * @apiName RefreshAFeed
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} feedId The feed's ID
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "articles": [
   *      {
   *        "id": 1,
   *        "title": "",
   *        "link": "",
   *        "pubDate": "",
   *        "creator": "",
   *        "contentSnippet": "",
   *        "content": "",
   *        "guid": "",
   *        "read": false,
   *        "markedAsReadAt": "",
   *        "feed": {
   *          "id": 1,
   *          "name": "",
   *          "feedUrl": "",
   *          "link": "",
   *          "icon": "",
   *          "fkFolder": 1
   *        }
   *      }
   *    ]
   *  }
   */

  private async refreshSingleFeed(req: Request, res: Response): Promise<void> {
    try {
      const feedId = parseInt(req.params.feedId);
      const refreshed = await refreshForSingleFeed(feedId);

      res.json({
        articles: refreshed.articles.map(serializeArticles)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new RefreshController();

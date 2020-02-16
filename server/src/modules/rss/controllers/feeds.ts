import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';

import { refreshForSingleFeed } from '../helpers/feedsHelper';

import Feed from '../models/Feed';
import Folder from '../models/Folder';

import { serialize, deserializeModelCreateUpdate } from '../serializer/feeds';
import { serialize as serializeArticle } from '../serializer/articles';

class FeedsController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', this.getAllFeeds);
    this.router.post('/', this.createFeed);
    this.router.put('/:id', this.updateFeed);
    this.router.delete('/:id', this.deleteFeed);
  }

  /**
   * @api {get} /api/rss/feeds Get All Feeds
   * @apiName GetAllFeeds
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
   *    "feeds": [
   *      {
   *        "id": 1,
   *        "name": "",
   *        "feedUrl": "",
   *        "link": "",
   *        "icon": "",
   *        "folder": {
   *          "id": 1,
   *          "name": ""
   *        }
   *      }
   *    ]
   *  }
   */

  private async getAllFeeds(req: Request, res: Response): Promise<void> {
    try {
      const feeds = await Feed.findAll({
        order: [
          ['name', 'DESC']
        ],
        include: [
          {
            model: Folder,
            as: 'folder',
            attributes: ['id', 'name']
          }
        ]
      });

      res.json({
        feeds: feeds.map(serialize)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {post} /api/rss/feeds Create a Feed
   * @apiName CreateAFeed
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {string} name The feed's name.
   * @apiParam {string} feedUrl The feed's url.
   * @apiParam {string} link The feed's link.
   * @apiParam {string} icon The feed's icon.
   * @apiParam {number} fkFolder The ID of the folder the folder belongs to.
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "name": "",
   *    "feedUrl": "",
   *    "link": "",
   *    "icon": "",
   *    "fkFolder": 1
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "feeds": [
   *      {
   *        "id": 1,
   *        "name": "",
   *        "feedUrl": "",
   *        "link": "",
   *        "icon": "",
   *        "folder": {
   *          "id": 1,
   *          "name": ""
   *        }
   *      }
   *    ]
   *  }
   */

  private async createFeed(req: Request, res: Response): Promise<void> {
    try {
      const deserialized = deserializeModelCreateUpdate(req.body);

      const feed = await Feed.create({
        feedUrl: deserialized.feedUrl
      });

      const refreshed = await refreshForSingleFeed(feed.id);

      await feed.update({
        name: refreshed.parsedFeed.title,
        link: refreshed.parsedFeed.link,
        fkFolder: deserialized.fkFolder
      });

      res.json({
        feed: serialize(feed),
        articles: refreshed.articles && refreshed.articles.map(serializeArticle)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {put} /api/rss/feeds/:id Update a Feed
   * @apiName UpdateAFeed
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} id The feed's ID.
   * @apiParam {string} [name] The feed's name.
   * @apiParam {string} [feedUrl] The feed's url.
   * @apiParam {string} [link] The feed's link.
   * @apiParam {string} [icon] The feed's icon.
   * @apiParam {number} [fkFolder] The ID of the folder the folder belongs to.
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "name": "",
   *    "feedUrl": "",
   *    "link": "",
   *    "icon": "",
   *    "fkFolder": 1
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "feed": {
   *      "id": 1,
   *      "name": "",
   *      "feedUrl": "",
   *      "link": "",
   *      "icon": "",
   *      "folder": {
   *        "id": 1,
   *        "name": ""
   *      }
   *    }
   *  }
   */

  private async updateFeed(req: Request, res: Response): Promise<void> {
    try {
      const deserialized = deserializeModelCreateUpdate(req.body);
      const feed = await Feed.findByPk(req.params.id);

      await feed.update(deserialized);

      res.json({
        feed: serialize(feed)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {delete} /api/rss/feeds/:id Delete a Feed
   * @apiName DeleteAFeed
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} id The feed's ID.
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   */

  private async deleteFeed(req: Request, res: Response): Promise<void> {
    try {
      await Feed.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(204).send('');
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new FeedsController();

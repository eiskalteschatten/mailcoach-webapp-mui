import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';

import Article from '../models/Article';
import Feed from '../models/Feed';

import { serialize, deserializeModelCreateUpdate } from '../serializer/articles';

class ArticlesController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', this.getAllArticles);
    this.router.get('/unread', this.getAllUnreadArticles);
    this.router.patch('/mark-all-read', this.markAllAsRead);
    this.router.patch('/mark-read-unread/:id', this.markArticleReadUnread);
    this.router.put('/:id', this.updateArticle);
    this.router.delete('/:id', this.deleteArticle);
  }

  /**
   * @api {get} /api/rss/articles Get All Articles
   * @apiName GetAllArticles
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

  private async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await Article.findAll({
        order: [
          ['pubDate', 'DESC']
        ],
        include: [{
          model: Feed,
          as: 'feed'
        }]
      });

      res.json({
        articles: articles.map(serialize)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {get} /api/rss/articles/unread Get All Unread Articles
   * @apiName GetAllUnreadArticles
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

  private async getAllUnreadArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await Article.findAll({
        where: {
          read: false
        },
        order: [
          ['pubDate', 'DESC']
        ],
        include: [{
          model: Feed,
          as: 'feed'
        }]
      });

      res.json({
        articles: articles.map(serialize)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {patch} /api/rss/articles/mark-all-read Mark All Articles as Read
   * @apiName MarkAllArticlesAsRead
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

  private async markAllAsRead(req: Request, res: Response): Promise<void> {
    try {
      await Article.update({
        read: true,
        markedAsReadAt: new Date()
      }, {
        where: {
          read: false
        }
      });

      const articles = await Article.findAll({
        order: [
          ['pubDate', 'DESC']
        ],
        include: [{
          model: Feed,
          as: 'feed'
        }]
      });

      res.json({
        articles: articles.map(serialize)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {patch} /api/rss/articles/mark-read-unread/:id Mark an Article as Read or Unread
   * @apiName MarkAnArticleAsReadOrUnread
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} id The article's ID
   * @apiParam {boolean} read Whether the article should be marked as read or unread.
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "read": true
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
   *    "article": {
   *      "id": 1,
   *      "title": "",
   *      "link": "",
   *      "pubDate": "",
   *      "creator": "",
   *      "contentSnippet": "",
   *      "content": "",
   *      "guid": "",
   *      "read": false,
   *      "markedAsReadAt": "",
   *      "feed": {
   *        "id": 1,
   *        "name": "",
   *        "feedUrl": "",
   *        "link": "",
   *        "icon": "",
   *        "fkFolder": 1
   *      }
   *    }
   *  }
   */

  private async markArticleReadUnread(req: Request, res: Response): Promise<void> {
    try {
      const read: boolean = req.body.read;
      const id = req.params.id;

      const article = await Article.findByPk(id, {
        include: [{
          model: Feed,
          as: 'feed'
        }]
      });

      if (!article) {
        throw new HttpError(`An article with ID ${id} could not be found!`, 400);
      }

      await article.update({
        read,
        markedAsReadAt: read ? new Date() : null
      });

      res.json({
        article: serialize(article)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {put} /api/rss/articles/:id Update an Article
   * @apiName UpdateAnArticle
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} id The article's ID
   * @apiParam {string} [title] The article's title.
   * @apiParam {string} [link] The article's link.
   * @apiParam {string} [pubDate] The article's date of publication.
   * @apiParam {string} [creator] The article's creator.
   * @apiParam {string} [contentSnippet] A content snippet of the article.
   * @apiParam {string} [content] The article's content.
   * @apiParam {string} [guid] The article's unique ID.
   * @apiParam {boolean} [read] Whether the article should be marked as read or not.
   * @apiParam {string} [markedAsReadAt] When the article should be marked as read at.
   * @apiParam {number} [fkFeed] The article's feed ID.
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "title": "",
   *    "link": "",
   *    "pubDate": "",
   *    "creator": "",
   *    "contentSnippet": "",
   *    "content": "",
   *    "guid": "",
   *    "read": false,
   *    "markedAsReadAt": "",
   *    "fkFeed": 1
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
   *    "article": {
   *      "id": 1,
   *      "title": "",
   *      "link": "",
   *      "pubDate": "",
   *      "creator": "",
   *      "contentSnippet": "",
   *      "content": "",
   *      "guid": "",
   *      "read": false,
   *      "markedAsReadAt": "",
   *      "feed": {
   *        "id": 1,
   *        "name": "",
   *        "feedUrl": "",
   *        "link": "",
   *        "icon": "",
   *        "fkFolder": 1
   *      }
   *    }
   *  }
   */

  private async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const article = await Article.findByPk(id, {
        include: [{
          model: Feed,
          as: 'feed'
        }]
      });

      if (!article) {
        throw new HttpError(`An article with ID ${id} could not be found!`, 400);
      }

      const deserialized = deserializeModelCreateUpdate(req.body);
      await article.update(deserialized);

      res.json({
        article: serialize(article)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {delete} /api/rss/articles/:id Delete an Article
   * @apiName DeleteAnArticle
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} id The article's ID
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   */

  private async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      await Article.destroy({
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

export default new ArticlesController();

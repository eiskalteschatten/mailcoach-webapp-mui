import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';

import Article from '../models/Article';
import Feed from '../models/Feed';

class ArticlesController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', this.getAllArticles);
    this.router.get('/unread', this.getAllUnreadArticles);
    this.router.post('/', this.createArticle);
    this.router.patch('/mark-all-read', this.markAllAsRead);
    this.router.patch('/mark-read-unread/:id', this.markArticleReadUnread);
    this.router.patch('/:id', this.updateArticle);
    this.router.delete('/:id', this.deleteArticle);
  }

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

      res.json({ articles });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

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

      res.json({ articles });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await Article.create(req.body);

      res.json({ article });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

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

      res.json({ articles });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await Article.findByPk(req.params.id, {
        include: [{
          model: Feed,
          as: 'feed'
        }]
      });

      await article.update(req.body);

      res.json({ article });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async markArticleReadUnread(req: Request, res: Response): Promise<void> {
    try {
      const read: boolean = req.body.read;

      const article = await Article.findByPk(req.params.id, {
        include: [{
          model: Feed,
          as: 'feed'
        }]
      });

      await article.update({
        read,
        markedAsReadAt: read ? new Date() : null
      });

      res.json({ article });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

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

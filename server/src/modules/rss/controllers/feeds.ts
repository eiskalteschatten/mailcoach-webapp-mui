import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';

import { refreshForSingleFeed } from '../helpers/feedsHelper';

import Feed from '../models/Feed';
import Folder from '../models/Folder';


class FeedsController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', this.getAllFeeds);
    this.router.post('/', this.createFeed);
    this.router.patch('/:id', this.updateFeed);
    this.router.delete('/:id', this.deleteFeed);
  }

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

      res.json({ feeds });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async createFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await Feed.create({
        feedUrl: req.body.feedUrl
      });

      const refreshed = await refreshForSingleFeed(feed.id);

      await feed.update({
        name: refreshed.parsedFeed.title,
        link: refreshed.parsedFeed.link,
        fkFolder: req.body.fkFolder
      });

      res.json({
        feed,
        articles: refreshed.articles
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async updateFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await Feed.findByPk(req.params.id);

      await feed.update(req.body);

      res.json({ feed });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

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

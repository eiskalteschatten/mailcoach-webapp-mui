import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';

import Folder from '../models/Folder';

class FoldersController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', this.getAllFolders);
    this.router.post('/', this.createFolder);
    this.router.patch('/:id', this.updateFolder);
    this.router.delete('/:id', this.deleteFolder);
  }

  private async getAllFolders(req: Request, res: Response): Promise<void> {
    try {
      const folders = await Folder.findAll({
        order: [
          ['name', 'DESC']
        ]
      });

      res.json({ folders });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async createFolder(req: Request, res: Response): Promise<void> {
    try {
      const folder = await Folder.create(req.body);

      res.json({ folder });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async updateFolder(req: Request, res: Response): Promise<void> {
    try {
      const folder = await Folder.findByPk(req.params.id);

      await folder.update(req.body);

      res.json({ folder });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private async deleteFolder(req: Request, res: Response): Promise<void> {
    try {
      await Folder.destroy({
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

export default new FoldersController();

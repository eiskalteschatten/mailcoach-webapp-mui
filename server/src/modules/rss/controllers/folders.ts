import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import AbstractController from '@mc/modules/AbstractController';
import { HttpError } from '@mc/lib/Error';

import Folder from '../models/Folder';

import { serialize, deserializeModelCreateUpdate } from '../serializer/folders';

class FoldersController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', this.getAllFolders);
    this.router.post('/', this.createFolder);
    this.router.put('/:id', this.updateFolder);
    this.router.delete('/:id', this.deleteFolder);
  }

  /**
   * @api {get} /api/rss/folders Get All Folders
   * @apiName GetAllFolders
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
   *    "folders": [
   *      {
   *        "id": 1,
   *        "name": ""
   *      }
   *    ]
   *  }
   */

  private async getAllFolders(req: Request, res: Response): Promise<void> {
    try {
      const folders = await Folder.findAll({
        order: [
          ['name', 'DESC']
        ]
      });

      res.json({
        folders: folders.map(serialize)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {post} /api/rss/folders Create a Folder
   * @apiName CreateAFolder
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {string} name The folder's name.
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "name": ""
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
   *    "folder": {
   *      "id": 1,
   *      "name": ""
   *    }
   *  }
   */

  private async createFolder(req: Request, res: Response): Promise<void> {
    try {
      const deserialized = deserializeModelCreateUpdate(req.body);
      const folder = await Folder.create(deserialized);

      res.json({
        folder: serialize(folder)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {put} /api/rss/folders/:id Update a Folder
   * @apiName UpdateAFolder
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} id The folder's ID.
   * @apiParam {string} [name] The folder's name.
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "name": ""
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
   *    "folder": {
   *      "id": 1,
   *      "name": ""
   *    }
   *  }
   */

  private async updateFolder(req: Request, res: Response): Promise<void> {
    try {
      const deserialized = deserializeModelCreateUpdate(req.body);
      const folder = await Folder.findByPk(req.params.id);

      await folder.update(deserialized);

      res.json({
        folder: serialize(folder)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {delete} /api/rss/folders/:id Delete a Folder
   * @apiName DeleteAFolder
   * @apiGroup RSS
   * @apiVersion 1.0.0
   *
   * @apiParam {number} id The folder's ID.
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   */

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

import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import { HttpError } from '@mc/lib/Error';
import AbstractController from '@mc/modules/AbstractController';
import authPassport from '@mc/lib/middleware/authPassport';

import { serialize, deserializeModelCreateUpdate } from '../serializer/userSettings';
import { ModelCreateUpdate } from '../interfaces/UserSettings';
import User from '../models/User';
import UserSettings from '../models/UserSetting';

class UserSettingsController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', authPassport, this.getItem);
    this.router.put('/', authPassport, this.updateItem);
  }

  /**
   * @api {get} /api/auth/users/settings Get a User's Settings
   * @apiName GetUserSettings
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer token"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "settings": {
   *      "language": "en",
   *      "theme": "dark"
   *    }
   *  }
   */

  private async getItem(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as User;

      const settings = await UserSettings.findOne({
        where: {
          fkUser: user.id
        }
      });

      res.json({
        settings: serialize(settings)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {put} /api/auth/users/settings Update a User's Settings
   * @apiName UpdateUserSettings
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParam {string} [language] The user's preferred language
   * @apiParam {string} [theme] The user's preferred theme
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "language": "en",
   *    "theme": "dark"
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer token"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "settings": {
   *      "language": "en",
   *      "theme": "dark"
   *    }
   *  }
   */

  private async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as User;
      const data: ModelCreateUpdate = req.body;
      const deserialized = deserializeModelCreateUpdate(data);

      await UserSettings.update(deserialized, {
        where: {
          fkUser: user.id
        }
      });

      const settings = await UserSettings.findOne({
        where: {
          fkUser: user.id
        }
      });

      res.json({
        settings: serialize(settings)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new UserSettingsController();

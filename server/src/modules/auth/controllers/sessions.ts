import { Request, Response } from 'express';
import { Op } from 'sequelize';

import AbstractController from '@mc/modules/AbstractController';import { returnError } from '@mc/lib/apiErrorHandling';
import { HttpError } from '@mc/lib/Error';
import authPassport from '@mc/lib/middleware/authPassport';

import User from '../models/User';
import UserSession from '../models/UserSession';

class SessionsController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', authPassport, this.getSessions);
    this.router.post('/logout', authPassport, this.logout);
  }

  /**
   * @api {get} /api/auth/users/sessions Get All of a User's Sessions
   * @apiName Sessions
   * @apiGroup Users
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
   *    "sessions": [
   *      {
   *        "loginDate": "2020-02-05 20:15:01.054+00",
   *        "instanceId": ""
   *      }
   *    ]
   *  }
   */

  private async getSessions(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as User).id;

      const userSessions = await UserSession.findAll({
        where: {
          fkUser: userId
        }
      });

      res.json({
        sessions: userSessions.map((session: UserSession): any => ({
          loginDate: session['created_at'],
          instanceId: session.instanceId
        }))
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {post} /api/auth/users/sessions/logout Log Out of All User's Sessions Except the Current One
   * @apiName LogoutAllUserSessions
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParam {string} instanceId The current instance ID
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "instanceId": ""
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   *
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 406 Bad Request
   *  {
   *    "message": "No instance ID was found!"
   *  }
   */

  private async logout(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as User).id;
      const instanceId = req.body.instanceId;

      if (!instanceId && process.env.NODE_ENV !== 'test') {
        throw new HttpError('No instance ID was found!', 400);
      }

      await UserSession.destroy({
        where: {
          fkUser: userId,
          [Op.not]: { instanceId }
        }
      });

      res.status(204).send('');
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new SessionsController();

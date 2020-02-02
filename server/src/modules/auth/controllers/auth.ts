import { Request, Response, NextFunction, RequestHandler } from 'express';
import passport from 'passport';

import AbstractController from '@mc/modules/AbstractController';
import { returnError } from '@mc/lib/apiErrorHandling';
import { HttpError } from '@mc/lib/Error';
import logger from '@mc/logger';

import User from '../models/User';
import UserService from '../services/UserService';
import { serialize } from '../serializer/user';
import { UserSessionWithUser } from '../interfaces/UserSession';

class AuthController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.post('/login', this.login);
    this.router.post('/logout', this.authRefreshTokenPassport, this.logout);
    this.router.post('/token', this.authRefreshTokenPassport, this.refreshAccessToken);
  }

  /**
   * @api {post} /auth/login Login
   * @apiName Login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam {string} username The user's username
   * @apiParam {string} password The user's password
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "username": "",
   *    "password": ""
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "user": {
   *      "id": 1,
   *      "username": "",
   *      "firstName": "",
   *      "lastName": ""
   *    },
   *    "accessToken": "",
   *    "refreshToken": ""
   *  }
   *
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 401 Unauthorized
   *  {
   *    "message": "Invalid credentials"
   *  }
   *
   *  HTTP/1.1 404 Not Found
   *  {
   *    "message": "The user could not be found!"
   *  }
   */

  private async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      passport.authenticate('local-login', { session: false }, (error: Error, user: User): void => {
        if (error) {
          return returnError(error, req, res);
        }

        req.login(user, { session: false }, async (loginError: Error): Promise<void> => {
          if (loginError) {
            return returnError(loginError as HttpError, req, res);
          }

          if (!user) {
            const httpError = new HttpError('The user could not be found!');
            return returnError(httpError, req, res);
          }

          const userService = new UserService();
          const accessToken = await userService.generateAccessToken(user.id);
          const refreshToken = await userService.generateRefreshToken(user.id);

          res.json({
            user: serialize(user),
            accessToken,
            refreshToken
          });
        });
      })(req, res, next);
    }
    catch(error) {
      if (error.status != 401) {
        if (error.status >= 500) {
          logger.error(error.message);
        }

        const httpError = new HttpError('The user could not be logged in for an unknown reason!', error.status);
        returnError(httpError, req, res);
      }
    }
  }

  /**
   * @api {post} /auth/logout Logout
   * @apiName Logout
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer refreshToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   */

  private async logout(req: Request, res: Response): Promise<void> {
    try {
      const userSession = req.user as UserSessionWithUser;

      const userService = new UserService();
      await userService.setUser(userSession.user.id);
      await userService.localLogout(userSession.instanceId);

      req.logout();
      res.status(204).send('');
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {post} /auth/token Get New Access Token
   * @apiName RefreshAccessToken
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer refreshTokenGoesHere"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "accessToken": "..."
   *  }
   *
   * @apiErrorExample {string} Error-Response:
   *  HTTP/1.1 401 Unauthorized
   *  {
   *    "message": "Unauthorized"
   *  }
   */

  private async refreshAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const userSession = req.user as UserSessionWithUser;
      const user = userSession.user;

      const userService = new UserService();
      await userService.setUser(user.id);
      const accessToken = await userService.generateAccessToken(user.id);

      res.json({
        user,
        accessToken,
        refreshToken: userSession.refreshToken
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private authRefreshTokenPassport(req: Request, res: Response, next: NextFunction): RequestHandler {
    return passport.authenticate('jwt-refresh-token', { session: false }, (error: Error, userSession: UserSessionWithUser, httpError?: HttpError): void => {
      try {
        if (error) {
          throw error;
        }

        if (httpError && httpError.status) {
          throw httpError;
        }

        if (!userSession) {
          throw new HttpError('Unauthorized', 401);
        }

        req.login(userSession, { session: false }, async (loginError: Error): Promise<void> => {
          if (loginError || !userSession) {
            if (loginError) {
              return returnError(loginError as HttpError, req, res);
            }
            const error = new HttpError('The user could not be logged in for an unknown reason!');
            return returnError(error, req, res);
          }

          next();
        });
      }
      catch(error) {
        returnError(error as HttpError, req, res);
      }
    })(req, res, next);
  }
}

export default new AuthController();

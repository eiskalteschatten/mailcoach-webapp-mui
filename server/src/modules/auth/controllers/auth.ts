import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import passport from 'passport';
import config from 'config';
// import jwt from 'jsonwebtoken';

import { returnError } from '@mc/lib/apiErrorHandling';
import { HttpError } from '@mc/lib/Error';
import logger from '@mc/logger';

class AuthController {
  router: Router;

  constructor() {
    this.router = Router();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.post('/login', this.login);
    this.router.post('/token', this.authPassport, this.refreshAccessToken);
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

  private async login(req: Request, res: Response): Promise<void> {
    try {
      // const ttl = config.get<string>('jwt.refreshToken.ttl');

      // const refreshToken = jwt.sign({
      //   id: user.id
      // },
      // config.get<string>('jwt.secret'),
      // {
      //   expiresIn: `${ttl}s`
      // });


      // TODO: save refresh token in the DB with the userId as a key

      // res.json({
      //   user,
      //   accessToken,
      //   refreshToken
      // });

      res.send();
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
   *    "accessToken": ""
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
      // const ttl = config.get<string>('jwt.refreshToken.ttl');

      // const refreshToken = jwt.sign({
      //   id: user.id
      // },
      // config.get<string>('jwt.secret'),
      // {
      //   expiresIn: `${ttl}s`
      // });


      // TODO: save refresh token in the DB with the userId as a key

      // res.json({
      //   user,
      //   accessToken,
      //   refreshToken
      // });

      res.send();
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  private authPassport(req: Request, res: Response, next: NextFunction): RequestHandler {
    return passport.authenticate('jwt-refresh-token', { session: false }, (error: Error, userId: number, httpError?: HttpError): void => {
      try {
        if (error) {
          throw error;
        }

        if (httpError && httpError.status) {
          throw httpError;
        }

        if (!userId) {
          throw new HttpError('Unauthorized', 401);
        }

        req.login(userId, { session: false }, async (loginError: Error): Promise<void> => {
          if (loginError || !userId) {
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

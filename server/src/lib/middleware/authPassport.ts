import { Request, Response, NextFunction, RequestHandler } from 'express';
import passport from 'passport';

import { returnError } from '@mc/lib/apiErrorHandling';
import { HttpError } from '@mc/lib/Error';
import User from '@mc/modules/auth/models/User';

export default function(req: Request, res: Response, next: NextFunction): RequestHandler {
  return passport.authenticate('jwt', { session: false }, (error: Error, user: User, httpError?: HttpError): void => {
    try {
      if (error) {
        throw error;
      }

      if (httpError && httpError.status) {
        throw httpError;
      }

      if (!user) {
        throw new HttpError('Unauthorized', 401);
      }

      req.login(user, { session: false }, async (loginError: Error): Promise<void> => {
        if (loginError || !user) {
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

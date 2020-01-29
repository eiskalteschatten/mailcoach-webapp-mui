import { Request } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import logger from '@mc/lib/logger';

const jwtSecret = process.env.JWT_SECRET || '';

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  passReqToCallback: true
};

export default async function (): Promise<void> {
  passport.use('jwt', new JwtStrategy(jwtConfig, async (req: Request, jwtPayload: any, done: Function): Promise<void> => {
    try {
      // const userId = jwtPayload.id;

      // Check if the user id exists as a key in the DB with the refresh token
    }
    catch(error) {
      logger.error(error);
      done(error);
    }
  }));

  passport.serializeUser((id: number, done: Function): void => {
    done(null, id);
  });

  passport.deserializeUser(async (id: string | number, done: Function): Promise<void> => {
    try {
      done(null, id);
    }
    catch(error) {
      logger.error(error);
    }
  });
}

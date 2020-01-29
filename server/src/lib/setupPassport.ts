import { Request } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import logger from '@mc/lib/logger';

const jwtRefreshTokenConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET || '',
  passReqToCallback: true
};

const jwtAccessTokenConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET || '',
  passReqToCallback: true
};

export default async function (): Promise<void> {
  passport.use('jwt-refresh-token', new JwtStrategy(jwtRefreshTokenConfig, async (req: Request, jwtPayload: any, done: Function): Promise<void> => {
    try {
      // const userId = jwtPayload.id;

      // Check if the user id exists as a key in the DB with the refresh token

      done(null, false);
    }
    catch(error) {
      logger.error(error);
      done(error);
    }
  }));

  passport.use('jwt', new JwtStrategy(jwtAccessTokenConfig, async (req: Request, jwtPayload: any, done: Function): Promise<void> => {
    try {
      // const userId = jwtPayload.id;

      done(null, false);
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

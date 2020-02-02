import { Request } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import logger from '@mc/lib/logger';
import User from '@mc/modules/auth/models/User';
import UserSession from '@mc/modules/auth/models/UserSession';
import UserService from '@mc/modules/auth/services/UserService';

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
      const userId = jwtPayload.id;

      const userSession = await UserSession.findOne({
        where: {
          fkUser: userId
        },
        include: [{
          model: User,
          as: 'user'
        }]
      });

      if (!userSession || !userSession.user) {
        done(null, false);
      }

      done(null, userSession.user);
    }
    catch(error) {
      logger.error(error);
      done(error);
    }
  }));

  passport.use('jwt', new JwtStrategy(jwtAccessTokenConfig, async (req: Request, jwtPayload: any, done: Function): Promise<void> => {
    try {
      const userService = new UserService();
      const canLogin = await userService.jwtLogin(jwtPayload.id);
      const user = userService.getUser();

      if (!canLogin || !user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch(error) {
      logger.error(error);
      done(error);
    }
  }));

  passport.serializeUser((user: User, done: Function): void => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string | number, done: Function): Promise<void> => {
    try {
      const userService = new UserService();
      const user = await userService.setUser(id);
      done(null, user);
    }
    catch(error) {
      logger.error(error);
    }
  });
}

import express, { Request, Response } from 'express';
import compression from 'compression';
import { connectLogger } from 'log4js';
import bodyParser from 'body-parser';
import passport from 'passport';

import logger from '@mc/logger';
import { HttpError } from '@mc/lib/Error';
import setupPassport from '@mc/lib/setupPassport';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
  }

  async setupApp(): Promise<express.Application> {
    this.configureExpress();
    await this.configurePassport();
    await this.configureGenericErrorHandling();

    logger.info('App started with:');
    logger.info('- Node.js', process.version);
    logger.info(`- Started with NODE_ENV=${process.env.NODE_ENV}`);

    return this.app;
  }

  private configureExpress(): void {
    this.app.use(compression());
    this.app.use(connectLogger(logger, { level: 'auto', context: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.disable('x-powered-by');
  }

  private async configurePassport(): Promise<void> {
    this.app.use(passport.initialize());
    await setupPassport();
  }

  private async configureGenericErrorHandling(): Promise<void> {
    this.app.use((req: Request, res: Response): void => {
      res.status(404).json({
        message: 'Not found'
      });
    });

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // Development error handler - will print stacktrace
      this.app.use((error: HttpError, req: Request, res: Response): void => {
        res.status(error.status || 500);
        logger.error(error.message);
        res.json({
          message: error.message,
          error: error
        });
      });
    }
    else {
      // Production error handler - no stacktraces leaked to user
      this.app.use((error: HttpError, req: Request, res: Response): void => {
        res.status(error.status || 500);
        logger.error(error.message);
        res.json({
          message: error.message
        });
      });
    }
  }
}

export default new App();

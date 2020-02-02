import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import setupPassport from '../setupPassport';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
  }

  async setupApp(): Promise<express.Application> {
    this.configureExpress();
    await this.configurePassport();
    return this.app;
  }

  private configureExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private async configurePassport(): Promise<void> {
    this.app.use(passport.initialize());
    await setupPassport();
  }
}

export default new App();

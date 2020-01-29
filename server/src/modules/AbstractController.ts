import { Router } from 'express';

import Controller from '@mc/interfaces/Controller';

abstract class AbstractController implements Controller {
  router: Router;

  constructor() {
    this.router = Router();
  }
}

export default AbstractController;

import { Router } from 'express';

export default interface Module {
  router: Router;
  entryRoute: string;
} // eslint-disable-line semi

import { Request, Response } from 'express';

import { HttpError } from '@mc/lib/Error';
import logger from '@mc/logger';

export function returnError(error: HttpError, req: Request, res: Response): void {
  logger.error(error);

  res.status(error.status || 500).json({
    message: error.message || 'An error occurred'
  });
}

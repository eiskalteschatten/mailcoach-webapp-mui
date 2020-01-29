import { HttpError } from '@mc/lib/Error';
import { res, req } from '@mc/lib/tests/expressMocks';

import { returnError } from './apiErrorHandling';

describe('API error handling', () => {
  test('returnError is a function', () => {
    expect(typeof returnError === 'function').toBeTruthy();
  });

  test('returnError returns an error', () => {
    const error = new HttpError('something happened', 418);
    returnError(error, req, res);
    expect(res.status).toBeCalledWith(418);
  });
});

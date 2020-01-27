import { HttpError } from './Error';

describe('HttpError', () => {
  const errorMessage = 'Ouch, an error occurred.';

  test('Can be constructed with right elements', async () => {
    const httpError = new HttpError(errorMessage, 418);
    expect(httpError).toBeDefined();
    expect(httpError.message).toEqual(errorMessage);
    expect(httpError.status).toEqual(418);
  });

  test('Has default status code', async () => {
    const httpError = new HttpError(errorMessage);
    expect(httpError.status).toEqual(404);
  });
});

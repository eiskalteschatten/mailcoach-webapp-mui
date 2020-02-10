import authModule from '.';

describe('AuthModule', () => {
  test('Exists', () => {
    expect(authModule).toBeDefined();
  });

  test('entryRoute to be correct', () => {
    expect(authModule.entryRoute).toBe('/auth');
  });
});

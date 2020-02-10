import rssModule from '.';

describe('ssModule', () => {
  test('Exists', () => {
    expect(rssModule).toBeDefined();
  });

  test('entryRoute to be correct', () => {
    expect(rssModule.entryRoute).toBe('/rss');
  });
});

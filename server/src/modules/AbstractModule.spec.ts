import AbstractModule from './AbstractModule';

class TestModule extends AbstractModule {}

describe('AbstractModule', () => {
  let abstractModule: AbstractModule;

  beforeAll(async (done) => {
    abstractModule = new TestModule();
    done();
  });

  test('Exists', () => {
    expect(abstractModule).toBeDefined();
  });
});

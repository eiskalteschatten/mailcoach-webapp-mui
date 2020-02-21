import AbstractController from './AbstractController';

class TestController extends AbstractController {}

describe('AbstractController', () => {
  let abstractController: TestController;

  beforeAll(async (done) => {
    abstractController = new TestController();
    done();
  });

  test('Exists', () => {
    expect(abstractController).toBeDefined();
  });

  test('router is defined', () => {
    expect(() => abstractController.router).toBeDefined();
  });
});

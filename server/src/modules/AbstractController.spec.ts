import sequelizeFixtures from 'sequelize-fixtures';

import User from './auth/models/User';
import userFixture from './auth/fixtures/users';

import AbstractController from './AbstractController';

class TestController extends AbstractController {}

describe('AbstractController', () => {
  let abstractController: TestController;

  beforeAll(async (done) => {
    sequelizeFixtures.loadFixtures([userFixture], { User });
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

import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';

import testApp from '@mc/lib/tests/testExpressApp';
import { getTokenByUsername } from '@mc/lib/tests/helper';
import usersFixture from '@mc/modules/auth/fixtures/users';
import User from '@mc/modules/auth/models/User';

import foldersController from './folders';
import Folder from '../models/Folder';
import fixture from '../fixtures/folders';

describe('Folders Controller', () => {
  let app: express.Application;
  let token: string;

  beforeAll(async (done) => {
    try {
      // await sequelizeFixtures.loadFixtures(
      //   [usersFixture, fixture],
      //   { User, Folder }
      // );

      app = await testApp.setupApp();
      app.use(foldersController.router);

      token = await getTokenByUsername(usersFixture.data.username);

      done();
    }
    catch(error) {
      done(error);
    }
  });

  test.todo('Re-add tests');

  // test('Exists', () => {
  //   expect(foldersController).toBeDefined();
  // });

  // test('Getting all folders works', async () => {
  //   const response: request.Response = await request(app)
  //     .get('/')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(response.status).toEqual(200);

  //   const folders = response.body.folders;

  //   expect(folders).toBeDefined();
  //   expect(folders[0].id).toBeDefined();
  //   expect(folders[0].name).toBeDefined();
  // });

  // test('Creating a folder works', async () => {
  //   const response: request.Response = await request(app)
  //     .post('/')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       name: 'New Folder'
  //     });

  //   expect(response.status).toEqual(200);

  //   const folder = response.body.folder;

  //   expect(folder).toBeDefined();
  //   expect(folder.id).toBeDefined();
  //   expect(folder.name).toBeDefined();
  // });

  // test('Updating a folder works', async () => {
  //   const newName = 'New Name';

  //   const response: request.Response = await request(app)
  //     .put('/1')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       name: newName
  //     });

  //   expect(response.status).toEqual(200);

  //   const folder = response.body.folder;

  //   expect(folder).toBeDefined();
  //   expect(folder.id).toBeDefined();
  //   expect(folder.name).toEqual(newName);
  // });

  // test('Deleting a folder works', async () => {
  //   const response: request.Response = await request(app)
  //     .delete('/1')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(response.status).toEqual(204);
  // });
});

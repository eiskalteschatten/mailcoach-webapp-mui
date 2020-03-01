import express from 'express';
import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';

import testApp from '@mc/lib/tests/testExpressApp';
import { getTokenByUsername } from '@mc/lib/tests/helper';

import usersFixture from '@mc/modules/auth/fixtures/users';
import User from '@mc/modules/auth/models/User';


import articlesController from './articles';
import Article from '../models/Article';
import fixture from '../fixtures/articles';

describe('Articles Controller', () => {
  let app: express.Application;
  let token: string;

  beforeAll(async (done) => {
    try {
      // await sequelizeFixtures.loadFixtures(
      //   [usersFixture, fixture],
      //   { User, Article }
      // );

      app = await testApp.setupApp();
      app.use(articlesController.router);

      token = await getTokenByUsername(usersFixture.data.username);

      done();
    }
    catch(error) {
      done(error);
    }
  });

  test.todo('Re-add tests');

  // test('Exists', () => {
  //   expect(articlesController).toBeDefined();
  // });

  // test('Getting all articles works', async () => {
  //   const response: request.Response = await request(app)
  //     .get('/')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(response.status).toEqual(200);

  //   const articles = response.body.articles;

  //   expect(articles).toBeDefined();
  //   expect(articles[0].id).toBeDefined();
  //   expect(articles[0].title).toBeDefined();
  //   expect(articles[0].link).toBeDefined();
  //   expect(articles[0].pubDate).toBeDefined();
  //   expect(articles[0].creator).toBeDefined();
  //   expect(articles[0].contentSnippet).toBeDefined();
  //   expect(articles[0].content).toBeDefined();
  //   expect(articles[0].guid).toBeDefined();
  //   expect(articles[0].read).toBeDefined();
  //   expect(articles[0].markedAsReadAt).toBeDefined();
  //   expect(articles[0].feed).toBeDefined();
  // });

  // test('Getting all unread articles works', async () => {
  //   const response: request.Response = await request(app)
  //     .get('/unread')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(response.status).toEqual(200);

  //   const articles = response.body.articles;

  //   expect(articles).toBeDefined();
  //   expect(articles[0].id).toBeDefined();
  //   expect(articles[0].title).toBeDefined();
  //   expect(articles[0].link).toBeDefined();
  //   expect(articles[0].pubDate).toBeDefined();
  //   expect(articles[0].creator).toBeDefined();
  //   expect(articles[0].contentSnippet).toBeDefined();
  //   expect(articles[0].content).toBeDefined();
  //   expect(articles[0].guid).toBeDefined();
  //   expect(articles[0].read).toBeDefined();
  //   expect(articles[0].markedAsReadAt).toBeDefined();
  //   expect(articles[0].feed).toBeDefined();
  // });

  // test('Marking all articles as read works', async () => {
  //   const response: request.Response = await request(app)
  //     .patch('/mark-all-read')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(response.status).toEqual(200);

  //   const articles = response.body.articles;

  //   expect(articles).toBeDefined();
  //   expect(articles[0].id).toBeDefined();
  //   expect(articles[0].title).toBeDefined();
  //   expect(articles[0].link).toBeDefined();
  //   expect(articles[0].pubDate).toBeDefined();
  //   expect(articles[0].creator).toBeDefined();
  //   expect(articles[0].contentSnippet).toBeDefined();
  //   expect(articles[0].content).toBeDefined();
  //   expect(articles[0].guid).toBeDefined();
  //   expect(articles[0].read).toBeDefined();
  //   expect(articles[0].markedAsReadAt).toBeDefined();
  //   expect(articles[0].feed).toBeDefined();
  // });

  // test('Marking an article as read works', async () => {
  //   const response: request.Response = await request(app)
  //     .patch('/mark-read-unread/1')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       read: true
  //     });

  //   expect(response.status).toEqual(200);

  //   const article = response.body.article;

  //   expect(article).toBeDefined();
  //   expect(article.id).toBeDefined();
  //   expect(article.title).toBeDefined();
  //   expect(article.link).toBeDefined();
  //   expect(article.pubDate).toBeDefined();
  //   expect(article.creator).toBeDefined();
  //   expect(article.contentSnippet).toBeDefined();
  //   expect(article.content).toBeDefined();
  //   expect(article.guid).toBeDefined();
  //   expect(article.read).toBeDefined();
  //   expect(article.markedAsReadAt).toBeDefined();
  //   expect(article.feed).toBeDefined();
  // });

  // test('Marking an unarticle as unread works', async () => {
  //   const response: request.Response = await request(app)
  //     .patch('/mark-read-unread/1')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       read: false
  //     });

  //   expect(response.status).toEqual(200);

  //   const article = response.body.article;

  //   expect(article).toBeDefined();
  //   expect(article.id).toBeDefined();
  //   expect(article.title).toBeDefined();
  //   expect(article.link).toBeDefined();
  //   expect(article.pubDate).toBeDefined();
  //   expect(article.creator).toBeDefined();
  //   expect(article.contentSnippet).toBeDefined();
  //   expect(article.content).toBeDefined();
  //   expect(article.guid).toBeDefined();
  //   expect(article.read).toBeDefined();
  //   expect(article.markedAsReadAt).toBeDefined();
  //   expect(article.feed).toBeDefined();
  // });

  // test('Updating an article works', async () => {
  //   const response: request.Response = await request(app)
  //     .put('/1')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       markedAsReadAt: new Date()
  //     });

  //   expect(response.status).toEqual(200);

  //   const article = response.body.article;

  //   expect(article).toBeDefined();
  //   expect(article.id).toBeDefined();
  //   expect(article.title).toBeDefined();
  //   expect(article.link).toBeDefined();
  //   expect(article.pubDate).toBeDefined();
  //   expect(article.creator).toBeDefined();
  //   expect(article.contentSnippet).toBeDefined();
  //   expect(article.content).toBeDefined();
  //   expect(article.guid).toBeDefined();
  //   expect(article.read).toBeDefined();
  //   expect(article.markedAsReadAt).toBeDefined();
  //   expect(article.feed).toBeDefined();
  // });

  // test('Deleting an article works', async () => {
  //   const response: request.Response = await request(app)
  //     .delete('/1')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(response.status).toEqual(204);
  // });
});

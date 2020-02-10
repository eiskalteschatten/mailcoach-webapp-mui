import { Op } from 'sequelize';
import RssParser from 'rss-parser';

import { HttpError } from '@mc/lib/Error';

import { Article as ArticleInterface } from '../interfaces/Article';

import Article from '../models/Article';
import Feed from '../models/Feed';

export async function refreshAllFeeds(): Promise<ArticleInterface[]> {
  const rssParser = new RssParser();

  const feeds = await Feed.findAll({
    attributes: ['id', 'feedUrl']
  });

  const newArticles = [];
  const guids = [];

  for (const feed of feeds) {
    const parsedFeed = await rssParser.parseURL(feed.feedUrl);

    for (const article of parsedFeed.items) {
      const articleExists = await Article.findOne({
        where: {
          guid: article.guid
        }
      });

      if (!articleExists) {
        guids.push(article.guid);

        newArticles.push({
          ...article,
          read: false,
          fkFeed: feed.id
        });
      }
    }
  }

  await Article.bulkCreate(newArticles);

  const articles = await Article.findAll({
    where: {
      read: false,
      guid: {
        [Op.in]: guids
      }
    },
    order: [
      ['pubDate', 'DESC']
    ]
  });

  return articles;
}

interface RefreshSingleFeed {
  articles: ArticleInterface;
  parsedFeed: any;
}

export async function refreshForSingleFeed(feedId: number): Promise<RefreshSingleFeed> {
  const rssParser = new RssParser();

  const feed = await Feed.findByPk(feedId, {
    attributes: ['id', 'feedUrl']
  });

  if (!feed) {
    throw new HttpError('Feed not found!', 404);
  }

  const newArticles = [];
  const guids = [];
  const parsedFeed = await rssParser.parseURL(feed.feedUrl);

  for (const article of parsedFeed.items) {
    const articleExists = await Article.findOne({
      where: {
        guid: article.guid
      }
    });

    if (!articleExists) {
      guids.push(article.guid);

      newArticles.push({
        ...article,
        read: false,
        fkFeed: feed.id
      });
    }
  }

  await Article.bulkCreate(newArticles);

  const articles = await Article.findAll({
    where: {
      read: false,
      fkFeed: feedId,
      guid: {
        [Op.in]: guids
      }
    },
    order: [
      ['pubDate', 'DESC']
    ]
  });

  return {
    articles,
    parsedFeed
  };
}

import { Op } from 'sequelize';
import RssParser from 'rss-parser';

import { HttpError } from '@mc/lib/Error';
import logger from '@mc/logger';

import { DeserializedModel as ArticleInterface } from '../interfaces/Article';

import Article from '../models/Article';
import Feed from '../models/Feed';

export async function refreshAllFeeds(fkUser?: number): Promise<ArticleInterface[]> {
  const rssParser = new RssParser();

  const feeds = await Feed.findAll({
    attributes: ['id', 'feedUrl'],
    where: { fkUser }
  });

  const allArticles = await Article.findAll({
    where: { fkUser }
  });

  const allArticleGuids = allArticles.map(({ guid }: Article): string => guid);
  const newArticles = [];
  const guids = [];

  for (const feed of feeds) {
    const parsedFeed = await rssParser.parseURL(feed.feedUrl);

    for (const article of parsedFeed.items) {
      if (!allArticleGuids.includes(article.guid)) {
        guids.push(article.guid);

        newArticles.push({
          ...article,
          read: false,
          fkFeed: feed.id,
          fkUser
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
      },
      fkUser
    },
    order: [
      ['pubDate', 'DESC']
    ]
  });

  return articles;
}

interface RefreshSingleFeed {
  articles: ArticleInterface[];
  parsedFeed: any;
}

export async function refreshForSingleFeed(feedId: number, fkUser: number): Promise<RefreshSingleFeed> {
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
        guid: article.guid,
        fkUser
      }
    });

    if (!articleExists) {
      guids.push(article.guid);

      newArticles.push({
        ...article,
        read: false,
        fkFeed: feed.id,
        fkUser
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
      },
      fkUser
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

export async function validateRssUrl(feedUrl: string): Promise<RssParser.Output> {
  try {
    const rssParser = new RssParser();
    const parsedFeed = await rssParser.parseURL(feedUrl);
    return parsedFeed;
  }
  catch(error) {
    logger.error(error);
    throw new HttpError('The given feed URL is not a valid RSS feed url!', 406);
  }
}

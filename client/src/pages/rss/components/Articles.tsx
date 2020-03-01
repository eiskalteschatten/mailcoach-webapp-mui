import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  ButtonBase
} from '@material-ui/core';

import ComponentLoader from '../../../components/ComponentLoader';
import ArticleView from './ArticleView';

import { RSS_ALL_ITEMS_FOLDER_ID, RSS_UNREAD_ITEMS_FOLDER_ID } from '../../../constants';
import { State } from '../../../store';
import { articleGetAllUnread, articleGetAll } from '../../../store/actions/rss/articleActions';
import { SerializedModel as Article } from '../../../../../interfaces/rss/Article';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      padding: theme.spacing(2),
      fontSize: '1em',
      textAlign: 'left',
      display: 'block',
      lineHeight: '1.5em',
      '&:hover': {
        backgroundColor: theme.palette.type === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
      }
    },
    markedRead: {
      opacity: '.5'
    },
    articleTitle: {
      fontWeight: 'bold',
      fontSize: '1.1em'
    },
    feedName: {
      opacity: '.7'
    },
    articlePubDate: {
      opacity: '.7',
      fontSize: '.9em'
    },
    articleSnippet: {
      marginTop: theme.spacing(3),
      fontSize: '.9em',
      opacity: '.7'
    }
  })
);

const Articles: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isSmallAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  const allArticles = useSelector((state: State) => state.rss.article.articles) as Article[];
  const initialCheckOccurred = useSelector((state: State) => state.rss.article.initialCheckOccurred) as boolean;
  const selectedFolderId = useSelector((state: State) => state.rss.folder.selectedFolderId) as number;
  const selectedFeedId = useSelector((state: State) => state.rss.feed.selectedFeedId) as number;
  const showUnread = useSelector((state: State) => state.rss.article.showUnreadItems) as boolean;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articleDialogOpen, setArticleDialogOpen] = useState<boolean>(false);
  const [openArticleId, setOpenArticleId] = useState<number | undefined>();
  const [articles, setArticles] = useState<Article[]>();
  const [fetchedAllArticles, setFetchedAllArticles] = useState<boolean>(false);

  useEffect(() => {
    if (!initialCheckOccurred && (!allArticles || allArticles.length === 0)) {
      setIsLoading(true);
      dispatch(articleGetAllUnread());
    }
    else {
      setIsLoading(false);
    }
  }, [initialCheckOccurred, allArticles, dispatch]);

  useEffect(() => setArticles(allArticles), [allArticles]);

  useEffect(() => {
    let filteredArticles: Article[];

    if (selectedFolderId && selectedFolderId > 0 && allArticles) {
      filteredArticles = showUnread
        ? allArticles.filter((article: Article) =>
            article.feed && article.feed.fkFolder && selectedFolderId === article.feed.fkFolder
          )
        : allArticles.filter((article: Article) =>
            article.feed && article.feed.fkFolder && selectedFolderId === article.feed.fkFolder && !article.read
          );

      setArticles(filteredArticles);
    }
    else if (selectedFolderId && selectedFolderId < 0 && allArticles) {
      if (selectedFolderId === RSS_ALL_ITEMS_FOLDER_ID) {
        if (!fetchedAllArticles) {
          dispatch(articleGetAll());
        }

        setArticles(allArticles);
        setFetchedAllArticles(true);
      }
      else if (selectedFolderId === RSS_UNREAD_ITEMS_FOLDER_ID) {
        filteredArticles = allArticles.filter((article: Article) => !article.read);
        setArticles(filteredArticles);
      }
    }
  }, [selectedFolderId, allArticles, dispatch, fetchedAllArticles, showUnread]);

  useEffect(() => {
    if (selectedFeedId && allArticles) {
      const filteredArticles = showUnread
      ? allArticles.filter((article: Article) =>
          article.feed && selectedFeedId === article.feed.id
        )
      : allArticles.filter((article: Article) =>
          article.feed && selectedFeedId === article.feed.id && !article.read
        );

      setArticles(filteredArticles);
    }
  }, [selectedFeedId, allArticles, showUnread]);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const handleOpenArticle = (id: number) => {
    setOpenArticleId(id);
    setArticleDialogOpen(true);
  };

  const handleArticleDialogClose = () => {
    setArticleDialogOpen(false);
    setOpenArticleId(undefined);
  };

  return (<>
    <ComponentLoader isLoading={isLoading} />

    {!isLoading &&
      <Container>
        <Grid
          container
          spacing={isSmallAndUp ? 8 : 0}
          justify='flex-start'
        >
          {articles && articles.map((article: Article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ButtonBase
                className={clsx({
                  [classes.button]: true,
                  [classes.markedRead]: article.read
                })}
                onClick={() => handleOpenArticle(article.id)}
              >
                <div className={classes.articleTitle}>{article.title}</div>

                {article.feed && article.feed.name && (
                  <div className={classes.feedName}>{article.feed.name}</div>
                )}

                <div className={classes.articlePubDate}>
                  {new Date(article.pubDate).toLocaleString(undefined, dateOptions)}
                </div>

                <div className={classes.articleSnippet}>{article.contentSnippet}</div>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Container>
    }

    {openArticleId !== undefined && (
      <ArticleView
        open={articleDialogOpen}
        handleClose={handleArticleDialogClose}
        articleId={openArticleId}
      />
    )}
  </>);
}

export default Articles;

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
import { articleGetAllUnread } from '../../../store/actions/rss/articleActions';
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articleDialogOpen, setArticleDialogOpen] = useState<boolean>(false);
  const [openArticleIndex, setOpenArticleIndex] = useState<number | undefined>();
  const [articles, setArticles] = useState<Article[]>();

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
      filteredArticles = allArticles.filter((article: Article) =>
        article.feed && article.feed.fkFolder && selectedFolderId === article.feed.fkFolder
      );

      setArticles(filteredArticles);
    }
    else if (selectedFolderId && selectedFolderId < 0 && allArticles) {
      if (selectedFolderId === RSS_ALL_ITEMS_FOLDER_ID) {
        // TODO: get unread articles too
        setArticles(allArticles);
      }
      else if (selectedFolderId === RSS_UNREAD_ITEMS_FOLDER_ID) {
        filteredArticles = allArticles.filter((article: Article) => !article.read);
        setArticles(filteredArticles);
      }
    }
  }, [selectedFolderId, allArticles]);

  useEffect(() => {
    if (selectedFeedId && allArticles) {
      const filteredArticles = allArticles.filter((article: Article) =>
        article.feed && selectedFeedId === article.feed.id
      );

      setArticles(filteredArticles);
    }
  }, [selectedFeedId, allArticles]);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const handleOpenArticle = (index: number) => {
    setOpenArticleIndex(index);
    setArticleDialogOpen(true);
  };

  const handleArticleDialogClose = () => {
    setArticleDialogOpen(false);
    setOpenArticleIndex(undefined);
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
          {articles && articles.map((article: Article, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ButtonBase
                className={clsx({
                  [classes.button]: true,
                  [classes.markedRead]: article.read
                })}
                onClick={() => handleOpenArticle(index)}
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

    {openArticleIndex !== undefined && (
      <ArticleView
        open={articleDialogOpen}
        handleClose={handleArticleDialogClose}
        articleIndex={openArticleIndex}
      />
    )}
  </>);
}

export default Articles;

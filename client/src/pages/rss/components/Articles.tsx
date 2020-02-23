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
      lineHeight: '1.5em'
    },
    markedRead: {
      opacity: '.7'
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
  const articles = useSelector((state: State) => state.rss.article.articles) as Article[];
  const initialCheckOccurred = useSelector((state: State) => state.rss.article.initialCheckOccurred) as boolean;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!initialCheckOccurred && (!articles || articles.length === 0)) {
      setIsLoading(true);
      dispatch(articleGetAllUnread());
    }
    else {
      setIsLoading(false);
    }
  }, [initialCheckOccurred, articles, dispatch]);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return (<>
    <ComponentLoader isLoading={isLoading} />

    {!isLoading &&
      <Container>
        <Grid
          container
          spacing={isSmallAndUp ? 8 : 0}
          justify='space-evenly'
        >
          {articles && articles.map((article: Article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ButtonBase
                className={clsx({
                  [classes.button]: true,
                  [classes.markedRead]: article.read
                })}
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
  </>);
}

export default Articles;

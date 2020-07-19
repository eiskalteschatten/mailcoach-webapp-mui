import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Parser as HtmlToReactParser } from 'html-to-react';

import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { State } from '../../../store';
import { SerializedModel as Article } from '../../../../../interfaces/rss/Article';
import { articleMarkReadUnread } from '../../../store/actions/rss/articleActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogPaper: {
      [theme.breakpoints.up('sm')]: {
        minWidth: 550
      }
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1)
    },
    feedName: {
      opacity: '.7'
    },
    articlePubDate: {
      opacity: '.7',
      fontSize: '.9em'
    },
    articleContent: {
      marginTop: theme.spacing(3)
    },
    grow: {
      flexGrow: 1
    }
  })
);

interface Props {
  open: boolean;
  handleClose: any;
  articleId: number;
}

const ArticleView: React.FC<Props> = (props) => {
  const {
    open,
    handleClose,
    articleId
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const articles = useSelector((state: State) => state.rss.article.articles) as Article[];
  const [manuallyMarked, setManuallyMarked] = useState<boolean>(false);
  const [article, setArticle] = useState<Article>();
  const [articleContent, setArticleContent] = useState();

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const handleOpenArticle = (link: string) => {
    window.open(link, '_blank');
  };

  const handleMarkAsReadOrUnread = (read: boolean) => {
    if (article) {
      dispatch(articleMarkReadUnread(article.id, read));
      setManuallyMarked(true);
    }
  };

  useEffect(() => {
    const selectedArticle = articles.find((article: Article): boolean => article.id === articleId);
    setArticle(selectedArticle);

    if (selectedArticle) {
      const htmlToReactParser = new HtmlToReactParser();
      const contentElement = htmlToReactParser.parse(selectedArticle.content);
      setArticleContent(contentElement)
    }
  }, [articles, articleId]);

  useEffect(() => {
    if (article && !article.read && !manuallyMarked) {
      setTimeout(() => dispatch(articleMarkReadUnread(article.id, true)), 750);
    }
  }, [article, manuallyMarked, dispatch]);

  if (!article) {
    return (<></>);
  }

  return (<Dialog
    open={open}
    onClose={handleClose}
    classes={{
      paper: classes.dialogPaper
    }}
    fullScreen={isMobile}
    fullWidth
    maxWidth='md'
  >
    <DialogTitle>
      {article.title}

      <IconButton className={classes.closeButton} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    <DialogContent>
      {article.feed && article.feed.name && (
        <div className={classes.feedName}>{article.feed.name}</div>
      )}

      <div className={classes.articlePubDate}>
        {new Date(article.pubDate).toLocaleString(undefined, dateOptions)}
      </div>

      <div className={classes.articleContent}>
        {articleContent}
      </div>
    </DialogContent>

    <DialogActions>
      {article.read ? (
        <Button onClick={() => handleMarkAsReadOrUnread(false)}>
          <FormattedMessage id='rssFeeds.markAsUnread' />
        </Button>
      ) : (
        <Button onClick={() => handleMarkAsReadOrUnread(true)}>
          <FormattedMessage id='rssFeeds.markAsRead' />
        </Button>
      )}

      <div className={classes.grow} />

      <Button onClick={() => handleOpenArticle(article.link)} color='primary'>
        <FormattedMessage id='rssFeeds.openArticle' />
      </Button>
    </DialogActions>
  </Dialog>);
}

export default ArticleView;

import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { SerializedModel as Article } from '../../../../../interfaces/rss/Article';
import { IntlContext } from '../../../intl/IntlContext';

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
  article: Article | undefined;
}

const ArticleView: React.FC<Props> = (props) => {
  const {
    open,
    handleClose,
    article
  } = props;

  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        {article.content}
      </div>
    </DialogContent>

    <DialogActions>
      <IconButton>
        <CheckIcon />
      </IconButton>

      <div className={classes.grow} />

      <Button onClick={() => handleOpenArticle(article.link)} color='primary'>
        <FormattedMessage id='rssFeeds.openArticle' />
      </Button>
    </DialogActions>
  </Dialog>);
}

export default ArticleView;

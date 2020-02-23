import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
  useMediaQuery,
  Grid,
  Typography,
  IconButton,
  Fab
} from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

import FoldersDrawer from './components/FoldersDrawer';
import Articles from './components/Articles';
import AddFeed from './components/AddFeed';

import { IntlContext } from '../../intl/IntlContext';
import { articleRefreshAndGetAllUnread, articleMarkAllRead } from '../../store/actions/rss/articleActions';
import ConfirmDialog from '../../components/ConfirmDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1)
    },
    toolbar: {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right'
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(1)
      }
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);

const RssPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallAndUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { messages } = useContext(IntlContext);
  const [addFeedDialogOpen, setAddFeedDialogOpen] = useState<boolean>(false);
  const [confirmMarkAllReadDialog, setConfirmMarkAllReadDialog] = useState<boolean>(false);

  const handleMarkAllRead = () => {
    setConfirmMarkAllReadDialog(true);
  };

  const handleRefreshArticles = () => {
    dispatch(articleRefreshAndGetAllUnread());
  };

  return (<div className={classes.root}>
    <FoldersDrawer />

    <div className={classes.content}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant='h4' noWrap>
            <FormattedMessage id='rssFeeds.feeds' />
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} className={classes.toolbar}>
          <IconButton edge={!isSmallAndUp && 'start'} onClick={handleMarkAllRead}>
            <CheckIcon />
          </IconButton>

          <IconButton edge={isSmallAndUp && 'end'} onClick={handleRefreshArticles}>
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Articles />
    </div>

    <Fab
      className={classes.fab}
      color='primary'
      onClick={() => setAddFeedDialogOpen(true)}
    >
      <AddIcon />
    </Fab>

    <AddFeed
      open={addFeedDialogOpen}
      handleClose={() => setAddFeedDialogOpen(false)}
    />

    <ConfirmDialog
      open={confirmMarkAllReadDialog}
      title={messages['rssFeeds.areYouSureMarkAllRead']}
      contentText={messages['rssFeeds.areYouSureMarkAllReadText']}
      handleClickYes={() => dispatch(articleMarkAllRead())}
      handleClickNo={() => setConfirmMarkAllReadDialog(false)}
      handleClose={() => setConfirmMarkAllReadDialog(false)}
    />
  </div>);
}

export default RssPage;

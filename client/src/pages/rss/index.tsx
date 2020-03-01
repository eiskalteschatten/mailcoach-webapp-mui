import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
  useMediaQuery,
  Grid,
  Typography,
  IconButton,
  Fab,
  Switch,
  FormControlLabel
} from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

import FoldersDrawer from './components/FoldersDrawer';
import Articles from './components/Articles';
import AddFeed from './components/AddFeed';

import { IntlContext } from '../../intl/IntlContext';
import { articleRefreshAndGetAllUnread, articleMarkAllRead, articleSetShowUnread, articleGetAll } from '../../store/actions/rss/articleActions';
import ConfirmDialog from '../../components/ConfirmDialog';
import { State } from '../../store';
import { RSS_ALL_ITEMS_FOLDER_ID, RSS_UNREAD_ITEMS_FOLDER_ID } from '../../constants';

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
    showUnreadSwitch: {
      marginLeft: theme.spacing(1)
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
  const { messages } = useContext(IntlContext);

  const theme = useTheme();
  const isSmallAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  const [addFeedDialogOpen, setAddFeedDialogOpen] = useState<boolean>(false);
  const [confirmMarkAllReadDialog, setConfirmMarkAllReadDialog] = useState<boolean>(false);

  const showUnread = useSelector((state: State) => state.rss.article.showUnreadItems) as boolean;
  const selectedFolderId = useSelector((state: State) => state.rss.folder.selectedFolderId) as number;

  const handleMarkAllRead = () => {
    setConfirmMarkAllReadDialog(true);
  };

  const handleRefreshArticles = () => {
    dispatch(articleRefreshAndGetAllUnread());
  };

  const handleShowUnread = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(articleSetShowUnread(event.target.checked));

    if (event.target.checked) {
      dispatch(articleGetAll());
    }
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

          <IconButton onClick={handleRefreshArticles}>
            <RefreshIcon />
          </IconButton>

          {selectedFolderId !== RSS_ALL_ITEMS_FOLDER_ID && selectedFolderId !== RSS_UNREAD_ITEMS_FOLDER_ID && (
            <FormControlLabel
              className={classes.showUnreadSwitch}
              control={
                <Switch
                  checked={showUnread}
                  onChange={handleShowUnread}
                  color='primary'
                />
              }
              label={messages.showUnread}
            />
          )}
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

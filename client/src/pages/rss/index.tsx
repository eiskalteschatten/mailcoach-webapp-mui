import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  createStyles,
  Theme,
  makeStyles,
  Grid,
  Typography,
  IconButton
} from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';
import CheckIcon from '@material-ui/icons/Check';

import { smallUpMediaQuery } from '../../lib/mediaQueries';
import FoldersDrawer from './components/FoldersDrawer';

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
    }
  })
);

const RssPage: React.FC = () => {
  const classes = useStyles();

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
          <IconButton edge={!smallUpMediaQuery.matches && 'start'}>
            <CheckIcon />
          </IconButton>

          <IconButton
            edge={smallUpMediaQuery.matches && 'end'}
          >
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>

    </div>
  </div>);
}

export default RssPage;

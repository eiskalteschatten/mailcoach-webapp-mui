import React from 'react';
import { FormattedMessage } from 'react-intl';

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
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);

const RssPage: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallAndUp = useMediaQuery(theme.breakpoints.up('sm'));

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
          <IconButton edge={!isSmallAndUp && 'start'}>
            <CheckIcon />
          </IconButton>

          <IconButton
            edge={isSmallAndUp && 'end'}
          >
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>

    </div>

    <Fab className={classes.fab} color='primary'>
      <AddIcon />
    </Fab>
  </div>);
}

export default RssPage;

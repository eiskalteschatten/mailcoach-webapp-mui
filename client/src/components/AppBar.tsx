import React from 'react';

import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';

import UserMenu from './user/UserMenu';

const useStyles = makeStyles((theme: Theme) => {
  const appBarBorderBottomColor = theme.palette.type === 'light'
    ? grey[300]
    : '#000000';

  return createStyles({
    root: {
      boxShadow: 'none',
      borderBottom: `1px solid ${appBarBorderBottomColor}`
    },
    title: {
      marginLeft: 10
    },
    grow: {
      flexGrow: 1
    }
  });
});

const AppBar: React.FC = () => {
  const classes = useStyles();

  return (<MuiAppBar
    position='fixed'
    color='default'
    className={classes.root}
  >
    <Toolbar>
      <IconButton
        onClick={() => {}}
        edge='start'
      >
        <MenuIcon />
      </IconButton>

      <Typography variant='h6' noWrap className={classes.title}>
        MailCoach
      </Typography>

      <div className={classes.grow} />

      <IconButton
        onClick={() => {}}
      >
        <AppsIcon />
      </IconButton>

      <UserMenu />
    </Toolbar>
  </MuiAppBar>);
}

export default AppBar;

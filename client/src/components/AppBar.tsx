import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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

import AppMenu from './AppMenu';
import UserMenu from './UserMenu';

import { State } from '../store';
import { appToggleLeftDrawer } from '../store/actions/appActions';

const useStyles = makeStyles((theme: Theme) => {
  const appBarBorderBottomColor = theme.palette.type === 'light'
    ? grey[300]
    : '#000000';

  return createStyles({
    root: {
      boxShadow: 'none',
      borderBottom: `1px solid ${appBarBorderBottomColor}`,
      zIndex: theme.zIndex.drawer + 1
    },
    title: {
      marginLeft: 10,
      cursor: 'pointer'
    },
    grow: {
      flexGrow: 1
    }
  });
});

interface Props extends RouteComponentProps {};

const AppBar: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const leftDrawerOpen = useSelector((state: State) => state.app.leftDrawerOpen);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(appToggleLeftDrawer(!leftDrawerOpen));
  };

  return (<MuiAppBar
    position='static'
    color='default'
    className={classes.root}
  >
    <Toolbar>
      <IconButton
        onClick={handleDrawerToggle}
        edge='start'
      >
        <MenuIcon />
      </IconButton>

      <Typography
        variant='h6'
        noWrap
        className={classes.title}
        onClick={() => props.history.push('/')}
      >
        MailCoach
      </Typography>

      <div className={classes.grow} />

      <AppMenu />
      <UserMenu />
    </Toolbar>
  </MuiAppBar>);
}

export default withRouter(AppBar);

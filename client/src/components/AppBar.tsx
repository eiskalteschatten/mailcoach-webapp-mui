import React from 'react';

import {
  AppBar as AppBarMu,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  })
);

const AppBar: React.FC = () => {
  // const classes = useStyles();

  return (<AppBarMu
    position='fixed'
  >
    <Toolbar>
      <IconButton
        onClick={() => {}}
        edge='start'
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap>
        MailCoach
      </Typography>
    </Toolbar>
  </AppBarMu>);
}

export default AppBar;

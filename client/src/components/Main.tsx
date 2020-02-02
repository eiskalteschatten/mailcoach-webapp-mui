import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

import AppBar from './AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

const Main: React.FC = () => {
  const classes = useStyles();

  return (<div className={classes.root}>
    <AppBar />
  </div>);
}

export default Main;

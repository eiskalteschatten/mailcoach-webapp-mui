import React from 'react';

import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';

import AppBar from '../AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    },
    appbarWrapper: {
      flex: 0
    },
    offset: theme.mixins.toolbar,
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3)
    }
  })
);

interface Props {
  children?: any;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (<div className={classes.wrapper}>
    <div className={classes.appbarWrapper}>
      <AppBar />
    </div>
    <div className={classes.offset} />
    <main className={classes.main}>
      {children}
    </main>
  </div>);
}

export default MainLayout;

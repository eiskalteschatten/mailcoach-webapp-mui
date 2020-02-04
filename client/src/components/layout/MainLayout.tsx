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
    <main className={classes.main}>
      {children}
    </main>
  </div>);
}

export default MainLayout;

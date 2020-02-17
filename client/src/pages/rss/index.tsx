import React from 'react';

import {
  createStyles,
  Theme,
  makeStyles
} from '@material-ui/core';

import FoldersDrawer from './components/FoldersDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1)
    }
  }),
);

const RssPage: React.FC = () => {
  const classes = useStyles();

  return (<div className={classes.root}>
    <FoldersDrawer />
    <div className={classes.content}>
      RssPage
    </div>
  </div>);
}

export default RssPage;

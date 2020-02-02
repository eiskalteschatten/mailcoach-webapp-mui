import React from 'react';

import {
  createStyles,
  makeStyles,
  Theme,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 50
    }
  })
);

const Booting: React.FC = () => {
  const classes = useStyles();

  return (<div className={classes.loader}>
    <LinearProgress />
  </div>);
}

export default Booting;

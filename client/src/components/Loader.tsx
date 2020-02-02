import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';

import {
  createStyles,
  makeStyles,
  Theme,
  Snackbar,
  CircularProgress
} from '@material-ui/core';

import { State } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      display: 'flex',
      alignItems: 'center'
    },
    progress: {
      marginRight: 15
    }
  })
);

const Loader: React.FC = () => {
  const classes = useStyles();
  const isLoading = useSelector((state: State) => state.app.isLoading);
  const [open, setOpen] = useState<boolean>(!!isLoading);

  useEffect(() => {
    setOpen(!!isLoading);
  }, [isLoading]);

  const handleClose = (event?: SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Loading: React.FC = () => <span className={classes.message}>
    <CircularProgress className={classes.progress} size={20} />
    Loading...
  </span>;

  return (<Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    open={open}
    onClose={handleClose}
    message={<Loading />}
  />);
}

export default Loader;

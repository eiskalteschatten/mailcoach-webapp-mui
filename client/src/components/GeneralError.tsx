import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';

import {
  createStyles,
  makeStyles,
  Theme,
  IconButton,
  Snackbar
} from '@material-ui/core';

import { Error as ErrorIcon, Close as CloseIcon } from '@material-ui/icons';

import { State } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      color: theme.palette.error.light,
      marginRight: 10
    }
  })
);

const GeneralError: React.FC = () => {
  const generalError = useSelector((state: State) => state.app.error);
  const [open, setOpen] = useState<boolean>(!!generalError);
  const classes = useStyles();

  useEffect(() => {
    setOpen(!!generalError);
  }, [generalError]);

  const handleClose = (event?: SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const ErrorMessage: React.FC = () => <span className={classes.message}>
    <ErrorIcon className={classes.icon} />
    {generalError}
  </span>;

  return (<Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    open={open}
    onClose={handleClose}
    message={<ErrorMessage />}
    action={[
      <IconButton
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    ]}
  />);
}

export default GeneralError;

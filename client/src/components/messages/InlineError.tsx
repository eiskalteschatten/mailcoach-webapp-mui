import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';

import { Error as ErrorIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.error.main,
      color: '#ffffff',
      padding: 15,
      marginTop: 20,
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      marginRight: 10
    }
  })
);

interface Props {
  messageId: string;
}

const InlineError: React.FC<Props> = ({ messageId }) => {
  const classes = useStyles();

  return (<div className={classes.root}>
    <ErrorIcon className={classes.icon} />
    <FormattedMessage id={messageId} />
  </div>);
}

export default InlineError;


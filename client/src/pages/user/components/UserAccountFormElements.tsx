import React, { useContext } from 'react';
import { Field } from 'formik';
import { fieldToTextField } from 'formik-material-ui';

import {
  createStyles,
  makeStyles,
  Theme,
  TextField
} from '@material-ui/core';

import { IntlContext } from '../../../intl/IntlContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      margin: '15px 0'
    },
    input: {
      width: 500,
      display: 'block'
    }
  })
);

const McTextField: React.FC<any> = (props) => {
  const classes = useStyles();
  const formikExtension = (props.form && props.field)
    ? fieldToTextField(props)
    : {}

  return (<TextField
    {...formikExtension}
    {...props}
    fullWidth
    className={classes.field}
    InputProps={{
      inputProps: {
        className: classes.input
      }
    }}
  />);
};

export const Username = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={McTextField}
    name='username'
    label={messages.username}
  />);
}

export const FirstName = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={McTextField}
    name='firstName'
    label={messages.firstName}
  />);
}

export const LastName = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={McTextField}
    name='lastName'
    label={messages.lastName}
  />);
}

export const Email = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={McTextField}
    name='email'
    label={messages.emailAddress}
  />);
}

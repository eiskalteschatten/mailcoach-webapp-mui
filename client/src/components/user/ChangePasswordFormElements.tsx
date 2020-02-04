import React, { useContext } from 'react';
import { Field } from 'formik';
import { fieldToTextField } from 'formik-material-ui';

import {
  createStyles,
  makeStyles,
  Theme,
  TextField
} from '@material-ui/core';

import { IntlContext } from '../../intl/IntlContext';

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

export const CurrentPassword = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={McTextField}
    name='currentPassword'
    label={messages.currentPassword}
    type='password'
  />);
}

export const NewPassword = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={McTextField}
    name='newPassword'
    label={messages.newPassword}
    type='password'
  />);
}

export const NewPasswordRepeat = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={McTextField}
    name='newPasswordRepeat'
    label={messages.passwordRepeat}
    type='password'
  />);
}

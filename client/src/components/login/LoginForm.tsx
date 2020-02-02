import React, { useContext } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { FormattedMessage } from 'react-intl';
import * as Yup from 'yup';  // For some reason this still has to be done for yup

import {
  createStyles,
  makeStyles,
  Theme,
  Button
} from '@material-ui/core';

import { LoginModel } from '../../../../interfaces/Users';

import { Username, Password } from './LoginFormElements';

import { dispatch } from '../../store';
import { loginUser } from '../../store/actions/userActions';
import { IntlContext } from '../../intl/IntlContext';

interface FormValues extends LoginModel {}

const initialValues: FormValues = {
  username: '',
  password: ''
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 25
    },
    loginButtonWrapper: {
      textAlign: 'right'
    },
    loginButton: {
      margin: '15px 0'
    }
  })
);

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const { messages } = useContext(IntlContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(messages.required),
    password: Yup.string()
      .required(messages.required)
  });

  return (<Formik
    initialValues={initialValues}
    onSubmit={async (values: FormValues, actions: any): Promise<void> => {
      await dispatch(loginUser(values));
      actions.setSubmitting(false);
    }}
    validationSchema={validationSchema}
    render={(formikProps: FormikProps<FormValues>) => (
      <Form className={classes.root}>
        <Username />
        <Password />
        <div className={classes.loginButtonWrapper}>
          <Button
            variant='contained'
            color='primary'
            className={classes.loginButton}
            type='submit'
            disabled={formikProps.isSubmitting}
          >
            <FormattedMessage id='logIn' />
          </Button>
        </div>
      </Form>
  )}/>);
}

export default LoginForm;


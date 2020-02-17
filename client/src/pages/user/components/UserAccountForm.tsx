import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, FormikProps } from 'formik';
import { FormattedMessage } from 'react-intl';
import * as Yup from 'yup';  // For some reason this still has to be done for yup

import {
  createStyles,
  makeStyles,
  Theme,
  Button
} from '@material-ui/core';

import { SerializedModel } from '../../../../../interfaces/auth/Users';

import {
  Username,
  FirstName,
  LastName,
  Email
} from './UserAccountFormElements';

import { State } from '../../../store';
import { updateUserSelf } from '../../../store/actions/userActions';
import { IntlContext } from '../../../intl/IntlContext';

interface FormValues extends SerializedModel {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 25
    },
    buttonWrapper: {
      textAlign: 'right'
    },
    button: {
      margin: '15px 0'
    }
  })
);

const UserAccountForm: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const user = useSelector((state: State) => state.user.user);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(messages.required),
    firstName: Yup.string()
      .required(messages.required),
    lastName: Yup.string()
      .required(messages.required),
    email: Yup.string()
      .required(messages.required)
  });

  return (<Formik
    initialValues={user}
    onSubmit={async (values: FormValues, actions: any): Promise<void> => {
      await dispatch(updateUserSelf(values));
      actions.setSubmitting(false);
    }}
    validationSchema={validationSchema}
  >
    {(formikProps: FormikProps<FormValues>) => (
      <Form className={classes.root}>
        <Username />
        <FirstName />
        <LastName />
        <Email />

        <div className={classes.buttonWrapper}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            type='submit'
            disabled={formikProps.isSubmitting}
          >
            <FormattedMessage id='save' />
          </Button>
        </div>
      </Form>
  )}</Formik>);
}

export default UserAccountForm;


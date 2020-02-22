import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';  // For some reason this still has to be done for yup

import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';

import { ModelCreateUpdate } from '../../../../../interfaces/rss/Feed';

import { FeedName, FeedUrl, FeedLink, FeedFolder } from './AddFeedFormElements';

import { feedAddFeed } from '../../../store/actions/rss/feedActions';
import { State } from '../../../store';
import { IntlContext } from '../../../intl/IntlContext';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

interface FormValues extends ModelCreateUpdate {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 25
    }
  })
);

interface Props {
  children: any;
  initialValues?: FormValues;
  handleClose?: any;
}

const AddFeedForm: React.FC<Props> = ({ children, initialValues, handleClose }) => {
  const dispatch = useDispatch();
  const folders = useSelector((state: State) => state.rss.folder.folders) as Folder[];
  const classes = useStyles();
  const { messages } = useContext(IntlContext);

  initialValues = initialValues || {
    name: '',
    feedUrl: '',
    link: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(messages.required),
    feedUrl: Yup.string()
      .url()
      .required(messages.required),
    link: Yup.string()
      .url()
  });

  return (<Formik
    initialValues={initialValues}
    onSubmit={async (values: FormValues, actions: any): Promise<void> => {
      handleClose();
      dispatch(feedAddFeed(values));
      actions.setSubmitting(false);
    }}
    validationSchema={validationSchema}
  >
    {(formikProps: FormikProps<FormValues>) => (
      <Form className={classes.root}>
        <FeedName />
        <FeedUrl />
        <FeedLink />
        <FeedFolder folders={folders} />

        {children}
      </Form>
  )}</Formik>);
}

export default AddFeedForm;


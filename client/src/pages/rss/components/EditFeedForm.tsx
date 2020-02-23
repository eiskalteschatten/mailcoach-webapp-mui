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

import { FeedName, FeedUrl, FeedLink, FeedFolder } from './EditFeedFormElements';

import { feedAddFeed, feedUpdateFeed } from '../../../store/actions/rss/feedActions';
import { State } from '../../../store';
import { IntlContext } from '../../../intl/IntlContext';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

interface FormValues extends ModelCreateUpdate {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      marginTop: 10
    }
  })
);

interface Props {
  children: any;
  initialValues?: FormValues;
  handleClose?: any;
  feedId?: number;
}

const EditFeedForm: React.FC<Props> = ({ children, initialValues, handleClose, feedId }) => {
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
      if (feedId) {
        await dispatch(feedUpdateFeed(feedId, values));
      }
      else {
        await dispatch(feedAddFeed(values));
      }

      handleClose();
      actions.setSubmitting(false);
    }}
    validationSchema={validationSchema}
  >
    {(formikProps: FormikProps<FormValues>) => (
      <Form>
        {feedId &&
          <FeedName />
        }

        <FeedUrl />

        {feedId &&
          <FeedLink />
        }

        <FeedFolder folders={folders} />

        <div className={classes.footer}>
          {children}
        </div>
      </Form>
  )}</Formik>);
}

export default EditFeedForm;


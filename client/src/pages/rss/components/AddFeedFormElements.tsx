import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';
import { fieldToTextField } from 'formik-material-ui';

import {
  createStyles,
  makeStyles,
  Theme,
  TextField,
  MenuItem,
  Divider
} from '@material-ui/core';

import { IntlContext } from '../../../intl/IntlContext';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

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

const CustomTextField: React.FC<any> = (props) => {
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

export const FeedName = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={CustomTextField}
    name='name'
    label={messages['rssFeeds.feedName']}
    autoFocus
  />);
};

export const FeedUrl = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={CustomTextField}
    name='feedUrl'
    label={messages['rssFeeds.feedUrl']}
  />);
};

export const FeedLink = () => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={CustomTextField}
    name='link'
    label={messages['rssFeeds.linkToWebsite']}
  />);
};

interface FolderProps {
  folders: Folder[];
}

export const FeedFolder = ({ folders }: FolderProps) => {
  const { messages } = useContext(IntlContext);

  return (<Field
    component={CustomTextField}
    name='fkFolder'
    label={messages['folder']}
    select
  >
    <MenuItem value=''>
      <FormattedMessage id='rssFeed.noFolder' />
    </MenuItem>
    <Divider />
    {folders.map((selectFolder: Folder) => (
      <MenuItem value={selectFolder.id} key={selectFolder.id}>
        {selectFolder.name}
      </MenuItem>
    ))}
  </Field>);
};

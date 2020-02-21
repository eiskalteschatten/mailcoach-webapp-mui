import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import {
  createStyles,
  Theme,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@material-ui/core';

import { State } from '../../../store';
import { IntlContext } from '../../../intl/IntlContext';
import { feedAddFeed } from '../../../store/actions/rss/feedActions';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formMargin: {
      marginTop: theme.spacing(2),
      marginButtom: theme.spacing(2)
    },
    select: {
      width: '100%'
    }
  })
);

interface Props {
  open: boolean;
  handleClose: any;
}

const AddFeed: React.FC<Props> = (props) => {
  const {
    open,
    handleClose
  } = props;

  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const dispatch = useDispatch();
  const folders = useSelector((state: State) => state.rss.folder.folders) as Folder[];
  const [feedForm, setFeedForm] = useState<any>({});

  const handleSave = () => {
    handleClose();
    dispatch(feedAddFeed(feedForm));
    setFeedForm({});
  };

  const handleOnFieldChange = (field: string, value: string) => {
    setFeedForm({
      ...feedForm,
      [field]: value
    });
  };

  return (<Dialog
    fullWidth
    maxWidth='xs'
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>
      <FormattedMessage id='rssFeeds.addFeed' />
    </DialogTitle>
    <DialogContent>
      <TextField
        fullWidth
        autoFocus
        label={messages['rssFeeds.feedName']}
        value={feedForm.name}
        onChange={(event) => handleOnFieldChange('name', event.currentTarget.value)}
        className={classes.formMargin}
      />

      <TextField
        fullWidth
        autoFocus
        label={messages['rssFeeds.feedUrl']}
        value={feedForm.feedUrl}
        onChange={(event) => handleOnFieldChange('feedUrl', event.currentTarget.value)}
        className={classes.formMargin}
      />

      <TextField
        fullWidth
        autoFocus
        label={messages['rssFeeds.linkToWebsite']}
        value={feedForm.link}
        onChange={(event) => handleOnFieldChange('link', event.currentTarget.value)}
        className={classes.formMargin}
      />

      <FormControl className={clsx(classes.formMargin, classes.select)}>
        <InputLabel>
          <FormattedMessage id='folder' />
        </InputLabel>
        <Select
          onChange={(event) => handleOnFieldChange('fkFolder', event.target.value as string)}
        >
          <MenuItem value=''>{messages['rssFeed.noFolder']}</MenuItem>
          <Divider />
          {folders.map((selectFolder: Folder) => (
            <MenuItem value={selectFolder.id} key={selectFolder.id}>{selectFolder.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>
        <FormattedMessage id='cancel' />
      </Button>
      <Button onClick={handleSave} color='primary' variant='contained'>
        <FormattedMessage id='addFolder' />
      </Button>
    </DialogActions>
  </Dialog>);
};

export default AddFeed;

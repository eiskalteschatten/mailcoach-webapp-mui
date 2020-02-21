import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';

import { IntlContext } from '../../../intl/IntlContext';
import { folderAddFolder } from '../../../store/actions/rss/folderActions';

interface Props {
  open: boolean;
  handleClose: any;
}

const AddFolder: React.FC<Props> = (props) => {
  const {
    open,
    handleClose
  } = props;

  const { messages } = useContext(IntlContext);
  const dispatch = useDispatch();
  const [folderName, setFolderName] = useState<string>('');

  const handleSave = () => {
    dispatch(folderAddFolder({ name: folderName }));
    handleClose();
  };

  return (<Dialog
    fullWidth
    maxWidth='xs'
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>
      <FormattedMessage id='rssFeeds.addFolder' />
    </DialogTitle>
    <DialogContent>
      <TextField
        fullWidth
        autoFocus
        label={messages['rssFeeds.folderName']}
        value={folderName}
        onChange={(event) => setFolderName(event.currentTarget.value)}
      />
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

export default AddFolder;

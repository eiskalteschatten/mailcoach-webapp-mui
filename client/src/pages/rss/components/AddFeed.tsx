import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

import AddFeedForm from './AddFeedForm';

interface Props {
  open: boolean;
  handleClose: any;
}

const AddFeed: React.FC<Props> = ({ open, handleClose }) => {
  const handleSave = () => {

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
      <AddFeedForm handleClose={handleClose}>

      </AddFeedForm>
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

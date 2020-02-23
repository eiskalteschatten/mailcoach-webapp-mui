import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  createStyles,
  makeStyles,
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  Button
} from '@material-ui/core';

import EditFeedForm from './EditFeedForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      textAlign: 'right'
    },
    button: {
      marginLeft: 10
    }
  })
);

interface Props {
  open: boolean;
  handleClose: any;
}

const AddFeed: React.FC<Props> = ({ open, handleClose }) => {
  const classes = useStyles();

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
      <EditFeedForm handleClose={handleClose}>
        <div className={classes.buttons}>
          <Button onClick={handleClose}>
            <FormattedMessage id='cancel' />
          </Button>
          <Button
            className={classes.button}
            // onClick={handleSave}
            type='submit'
            color='primary'
            variant='contained'
          >
            <FormattedMessage id='addFolder' />
          </Button>
        </div>
      </EditFeedForm>
    </DialogContent>
  </Dialog>);
};

export default AddFeed;

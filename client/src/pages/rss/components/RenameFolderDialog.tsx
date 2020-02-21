import React, { useState, useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  createStyles,
  Theme,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';

import { IntlContext } from '../../../intl/IntlContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogPaper: {
      [theme.breakpoints.up('sm')]: {
        minWidth: 450
      }
    }
  })
);

interface Props {
  open: boolean;
  handleClose: any;
  name: string;
  folderId: number;
}

const RenameFolderDialog: React.FC<Props> = (props) => {
  const {
    open,
    handleClose,
    name,
    folderId
  } = props;

  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (<Dialog
    open={open}
    onClose={handleClose}
    classes={{
      paper: classes.dialogPaper
    }}
  >
    <DialogTitle>
      <FormattedMessage id='rssFeeds.renameFolder' />
    </DialogTitle>

    <DialogContent>
      <TextField
        autoFocus
        margin='dense'
        id='name'
        label={messages['rssFeeds.folderName']}
        type='name'
        value={name}
        fullWidth
      />
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose}>
        <FormattedMessage id='cancel' />
      </Button>
      <Button onClick={handleClose} variant='contained' color='primary'>
        <FormattedMessage id='save' />
      </Button>
    </DialogActions>
  </Dialog>);
}

export default RenameFolderDialog;

import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button
} from '@material-ui/core';

interface Props {
  open: boolean;
  title: string;
  contentText: string;
  handleClickYes: any;
  handleClickNo: any;
  handleClose: any;
}

const ConfirmDialog: React.FC<Props> = (props) => {
  const {
    open,
    title,
    contentText,
    handleClickYes,
    handleClickNo,
    handleClose
  } = props;

  return (<Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {contentText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClickNo}autoFocus>
        <FormattedMessage id='no' />
      </Button>
      <Button onClick={handleClickYes} color='primary' variant='contained'>
      <FormattedMessage id='yes' />
      </Button>
    </DialogActions>
  </Dialog>);
};

export default ConfirmDialog;

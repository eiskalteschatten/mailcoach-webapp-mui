import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  createStyles,
  Theme,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { State } from '../../../store';
import { IntlContext } from '../../../intl/IntlContext';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';
import { SerializedModel as Feed } from '../../../../../interfaces/rss/Feed';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogPaper: {
      [theme.breakpoints.up('sm')]: {
        minWidth: 550
      }
    },
    nested: {
      paddingLeft: theme.spacing(5)
    },
    hidden: {
      display: 'none'
    }
  })
);

interface Props {
  open: boolean;
  handleClose: any;
}

const EditDialog: React.FC<Props> = (props) => {
  const {
    open,
    handleClose
  } = props;

  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const folders = useSelector((state: State) => state.rss.folder.folders) as Folder[];
  const [editorsOpen, setEditorsOpen] = useState<any>();

  const handleOpenEditor = (id: string) => {
    setEditorsOpen({
      ...editorsOpen,
      [id]: true
    });
  };

  const handleCloseEditor = (id: string) => {
    setEditorsOpen({
      ...editorsOpen,
      [id]: false
    });
  };

  return (<Dialog
    open={open}
    onClose={handleClose}
    classes={{
      paper: classes.dialogPaper
    }}
  >
    <DialogTitle>
      <FormattedMessage id='rssFeeds.editFoldersAndFeeds' />
    </DialogTitle>

    <DialogContent>
      <List>
        {folders.map((folder: Folder) => {
          const folderEditorId = `folder${folder.id}`;

          return (<span key={folder.id}>
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>

              <ListItemText
                className={clsx({
                  [classes.hidden]: editorsOpen && editorsOpen[folderEditorId]
                })}
                primary={folder.name}
              />

              <div
                className={clsx({
                  [classes.hidden]: !editorsOpen || !editorsOpen[folderEditorId]
                })}
              >
                <TextField
                  autoFocus
                  fullWidth
                  margin='dense'
                  value={folder.name}
                />
              </div>

              <ListItemSecondaryAction>
                <span
                  className={clsx({
                    [classes.hidden]: !editorsOpen || !editorsOpen[folderEditorId]
                  })}
                >
                  <IconButton onClick={() => handleCloseEditor(folderEditorId)}>
                    <CloseIcon />
                  </IconButton>
                  <IconButton onClick={() => handleCloseEditor(folderEditorId)} edge='end'>
                    <CheckIcon />
                  </IconButton>
                </span>

                <span
                  className={clsx({
                    [classes.hidden]: editorsOpen && editorsOpen[folderEditorId]
                  })}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton edge='end' onClick={() => handleOpenEditor(folderEditorId)}>
                    <CreateIcon />
                  </IconButton>
                </span>
              </ListItemSecondaryAction>
            </ListItem>

            {folder.feeds && folder.feeds.map((feed: Feed) => (
              <List component='div' disablePadding>
                <ListItem className={classes.nested}>
                  <ListItemText primary={feed.name} />

                  <ListItemSecondaryAction>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge='end'>
                      <CreateIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ))}
          </span>
        )})}
      </List>
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

export default EditDialog;

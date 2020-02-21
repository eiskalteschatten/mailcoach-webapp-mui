import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
  useMediaQuery,
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
  TextField,
  Collapse
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
    },
    editorButtons: {
      paddingTop: theme.spacing(1),
      textAlign: 'right'
    },
    deleteButton: {
      float: 'left'
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    fullScreen={isMobile}
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

              <ListItemText primary={folder.name} />

              <ListItemSecondaryAction
                className={clsx({
                  [classes.hidden]: editorsOpen && editorsOpen[folderEditorId]
                })}
              >
                <IconButton edge='end' onClick={() => handleOpenEditor(folderEditorId)}>
                  <CreateIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <Collapse
              in={editorsOpen && editorsOpen[folderEditorId]}
              timeout='auto'
              unmountOnExit
              className={classes.nested}
            >
              <TextField
                autoFocus
                fullWidth
                margin='dense'
                value={folder.name}
                label={messages['rssFeeds.folderName']}
              />

              <div className={classes.editorButtons}>
                <IconButton className={classes.deleteButton} edge='start'>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleCloseEditor(folderEditorId)}>
                  <CloseIcon />
                </IconButton>
                <IconButton onClick={() => handleCloseEditor(folderEditorId)} edge='end'>
                  <CheckIcon />
                </IconButton>
              </div>
            </Collapse>

            <List component='div' disablePadding>
              {folder.feeds && folder.feeds.map((feed: Feed) => {
                const feedEditorId = `feed${feed.id}`;

                return (<div key={feed.id}>
                  <ListItem className={classes.nested}>
                    <ListItemText primary={feed.name} />

                    <ListItemSecondaryAction
                      className={clsx({
                        [classes.hidden]: editorsOpen && editorsOpen[feedEditorId]
                      })}
                    >
                      <IconButton edge='end' onClick={() => handleOpenEditor(feedEditorId)}>
                        <CreateIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Collapse
                    in={editorsOpen && editorsOpen[feedEditorId]}
                    timeout='auto'
                    unmountOnExit
                    className={classes.nested}
                  >
                    <TextField
                      autoFocus
                      fullWidth
                      margin='dense'
                      value={feed.name}
                      label={messages['rssFeeds.feedName']}
                    />

                    <TextField
                      fullWidth
                      margin='dense'
                      value={feed.feedUrl}
                      label={messages['rssFeeds.feedUrl']}
                    />

                    <div className={classes.editorButtons}>
                      <IconButton className={classes.deleteButton} edge='start'>
                        <DeleteIcon />
                      </IconButton>

                      <IconButton onClick={() => handleCloseEditor(feedEditorId)}>
                        <CloseIcon />
                      </IconButton>
                      <IconButton onClick={() => handleCloseEditor(feedEditorId)} edge='end'>
                        <CheckIcon />
                      </IconButton>
                    </div>
                  </Collapse>
                </div>)
              })}
            </List>
          </span>
        )})}
      </List>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose}>
        <FormattedMessage id='close' />
      </Button>
    </DialogActions>
  </Dialog>);
}

export default EditDialog;

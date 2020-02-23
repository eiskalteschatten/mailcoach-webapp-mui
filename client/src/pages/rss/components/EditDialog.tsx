import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
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
  Collapse,
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { State } from '../../../store';
import { folderUpdateFolder, folderDeleteFolder } from '../../../store/actions/rss/folderActions';
import { feedDeleteFeed } from '../../../store/actions/rss/feedActions';
import { IntlContext } from '../../../intl/IntlContext';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';
import { SerializedModel as Feed } from '../../../../../interfaces/rss/Feed';

import ConfirmDialog from '../../../components/ConfirmDialog';
import EditFeedForm from './EditFeedForm';

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
    formMargin: {
      marginTop: theme.spacing(2),
      marginButtom: theme.spacing(2)
    },
    select: {
      width: '100%'
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
  const feeds = useSelector((state: State) => state.rss.feed.feeds) as Feed[];
  const [editorsOpen, setEditorsOpen] = useState<any>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [editorForm, setEditorForm] = useState<any>('');
  const [confirmFeedDialogOpen, setConfirmFeedDialogOpen] = useState<boolean>(false);
  const [confirmFolderDialogOpen, setConfirmFolderDialogOpen] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number>(-1);

  const handleOpenEditor = (id: string, values: any) => {
    setEditorsOpen({
      [id]: true
    });

    setEditorForm(values);
  };

  const handleCloseEditor = (id: string) => {
    setEditorsOpen({
      [id]: false
    });
  };

  const handleUpdateFolder = (id: number, editorId: string) => {
    handleCloseEditor(editorId);
    dispatch(folderUpdateFolder(id, editorForm));
  };

  const handleOnFieldChange = (field: string, value: string) => {
    setEditorForm({
      ...editorForm,
      [field]: value
    });
  };

  const handleConfirmDeleteFeed = (id: number) => {
    setConfirmDeleteId(id);
    setConfirmFeedDialogOpen(true);
  };

  const handleDeleteFeed = (id: number) => {
    dispatch(feedDeleteFeed(id));
    setConfirmFeedDialogOpen(false);
  };

  const handleConfirmDeleteFolder = (id: number) => {
    setConfirmDeleteId(id);
    setConfirmFolderDialogOpen(true);
  };

  const handleDeleteFolder = (id: number) => {
    dispatch(folderDeleteFolder(id));
    setConfirmFolderDialogOpen(false);
  };

  const getFeedsList = (feed: Feed, folderId?: number) => {
    const feedEditorId = `feed${feed.id}`;

    return (<div key={feed.id}>
      <ListItem className={clsx({
        [classes.nested]: folderId && folderId !== 0
      })}>
        <ListItemText primary={feed.name} />

        <ListItemSecondaryAction
          className={clsx({
            [classes.hidden]: editorsOpen && editorsOpen[feedEditorId]
          })}
        >
          <IconButton
            edge='end'
            onClick={() => handleOpenEditor(feedEditorId, {
              name: feed.name,
              feedUrl: feed.feedUrl
            })}
          >
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
        <EditFeedForm
          handleClose={handleCloseEditor}
          feedId={feed.id}
          initialValues={{
            ...feed,
            fkFolder: folderId
          }}
        >
          <div className={classes.editorButtons}>
            <IconButton
              className={classes.deleteButton}
              edge='start'
              onClick={() => handleConfirmDeleteFeed(feed.id)}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={() => handleCloseEditor(feedEditorId)}>
              <CloseIcon />
            </IconButton>
            <IconButton type='submit' edge='end'>
              <CheckIcon />
            </IconButton>
          </div>
        </EditFeedForm>
      </Collapse>
    </div>);
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
                <IconButton
                  edge='end'
                  onClick={() => handleOpenEditor(folderEditorId, {
                    name: folder.name
                  })}
                >
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
                label={messages['rssFeeds.folderName']}
                value={editorForm.name}
                onChange={(event) => handleOnFieldChange('name', event.currentTarget.value)}
              />

              <div className={classes.editorButtons}>
                <IconButton
                  className={classes.deleteButton}
                  edge='start'
                  onClick={() => handleConfirmDeleteFolder(folder.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleCloseEditor(folderEditorId)}>
                  <CloseIcon />
                </IconButton>
                <IconButton onClick={() => handleUpdateFolder(folder.id, folderEditorId)} edge='end'>
                  <CheckIcon />
                </IconButton>
              </div>
            </Collapse>

            <List component='div' disablePadding>
              {folder.feeds && folder.feeds.map((feed: Feed) => getFeedsList(feed, folder.id))}
            </List>
          </span>
        )})}

        {feeds.map((feed: Feed) => getFeedsList(feed))}
      </List>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose}>
        <FormattedMessage id='close' />
      </Button>
    </DialogActions>

    <ConfirmDialog
      open={confirmFeedDialogOpen}
      title={messages['rssFeeds.areYouSureDeleteFeed']}
      contentText={messages['rssFeeds.areYouSureDeleteFeedText']}
      handleClickYes={() => handleDeleteFeed(confirmDeleteId)}
      handleClickNo={() => setConfirmFeedDialogOpen(false)}
      handleClose={() => setConfirmFeedDialogOpen(false)}
    />

    <ConfirmDialog
      open={confirmFolderDialogOpen}
      title={messages['rssFeeds.areYouSureDeleteFolder']}
      contentText={messages['rssFeeds.areYouSureDeleteFolderText']}
      handleClickYes={() => handleDeleteFolder(confirmDeleteId)}
      handleClickNo={() => setConfirmFolderDialogOpen(false)}
      handleClose={() => setConfirmFolderDialogOpen(false)}
    />
  </Dialog>);
}

export default EditDialog;

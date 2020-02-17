import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import {
  createStyles,
  Theme,
  makeStyles,
  Drawer,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import { State } from '../../../store';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      flexShrink: 0,
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth
      }
    },
    drawerPaper: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerHeader: {
      padding: theme.spacing(2)
    },
    folderList: {
      flex: 'auto'
    },
    listItem: {
      '&:hover': {
        '& $listItemDelete': {
          display: 'inline !important'
        }
      }
    },
    listItemDelete: {
      display: 'none'
    }
  }),
);

function sortFolders(a: Folder, b: Folder): number {
  const aName = a.name.toUpperCase();
  const bName = b.name.toUpperCase();

  let comparison = 0;

  if (aName > bName) {
    comparison = 1;
  }
  else if (aName < bName) {
    comparison = -1;
  }

  return comparison;
}

const FolderDrawer: React.FC = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const folders = useSelector((state: State) => state.rss.folder.folders) as Folder[];
  let sortedFolders: Folder[] = folders;

  useEffect(() => {
    sortedFolders = folders;
    sortedFolders.sort(sortFolders);
  }, [folders]);

  return (<Drawer
    className={classes.root}
    variant='permanent'
    classes={{
      paper: classes.drawerPaper
    }}
  >
    <div className={classes.toolbar} />

    <div className={classes.drawerHeader}>
      <Typography variant='h6' noWrap>
        <FormattedMessage id='rssFeeds.feeds' />
      </Typography>
    </div>

    <Divider />

    <List>
      <ListItem button>
        <ListItemIcon>
          <RssFeedIcon />
        </ListItemIcon>
        <ListItemText primary='All Items' />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <NewReleasesIcon />
        </ListItemIcon>
        <ListItemText primary='Unread Items' />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary='Archive' />
      </ListItem>
    </List>

    <Divider />

    <div className={classes.folderList}>
      <List>
        {sortedFolders.map((folder) => (
          <span className={classes.listItem} key={folder.id}>
            <ListItem button>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={folder.name} />
              <ListItemSecondaryAction  className={classes.listItemDelete}>
                <IconButton edge='end'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </span>
        ))}
      </List>
    </div>

    <List>
      <ListItem button>
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary='Add Folder' />
      </ListItem>
    </List>
  </Drawer>);
}

export default FolderDrawer;

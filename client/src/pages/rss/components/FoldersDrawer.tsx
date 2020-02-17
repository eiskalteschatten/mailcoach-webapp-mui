import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import {
  createStyles,
  Theme,
  makeStyles,
  Drawer,
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
import { IntlContext } from '../../../intl/IntlContext';

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
  const { messages } = useContext(IntlContext);
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

    <List>
      <ListItem button>
        <ListItemIcon>
          <RssFeedIcon />
        </ListItemIcon>
        <ListItemText primary={messages.allItems} />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <NewReleasesIcon />
        </ListItemIcon>
        <ListItemText primary={messages.unreadItems} />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary={messages.archive} />
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
        <ListItemText primary={messages.addFolder} />
      </ListItem>
    </List>
  </Drawer>);
}

export default FolderDrawer;

import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import {
  createStyles,
  Theme,
  makeStyles,
  Drawer,
  Divider,
  IconButton,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Collapse
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ComponentLoader from '../../../components/ComponentLoader';

import { State } from '../../../store';
import { folderGetAllWithFeeds } from '../../../store/actions/rss/folderActions';
import { IntlContext } from '../../../intl/IntlContext';
import { SerializedModel as Folder } from '../../../../../interfaces/rss/Folder';
import { SerializedModel as Feed } from '../../../../../interfaces/rss/Feed';

const drawerWidth = 325;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
    folderList: {
      flex: 'auto'
    },
    listItem: {
      '&:hover': {
        '& $listItemMenu': {
          display: 'inline !important'
        }
      }
    },
    listItemMenu: {
      display: 'none'
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const FolderDrawer: React.FC = () => {
  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const folders = useSelector((state: State) => state.rss.folder.folders) as Folder[];
  const leftDrawerOpen = useSelector((state: State) => state.app.leftDrawerOpen);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [openFolders, setOpenFolders] = useState<any>({});

  useEffect(() => {
    if (!folders || folders.length === 0) {
      setIsLoading(true);
      dispatch(folderGetAllWithFeeds());
    }
  }, [folders, dispatch]);

  useEffect(() => {
    if (folders && folders.length > 0) {
      for (const folder of folders) {
        setOpenFolders({
          ...openFolders,
          [folder.id]: true
        });
      }
    }
  }, [folders]);

  const handleToggleFolder = (id: number) => {
    setOpenFolders({
      ...openFolders,
      [id]: !openFolders[id]
    });
  };

  return (<Drawer
    className={clsx({
      [classes.root]: leftDrawerOpen
    })}
    variant='persistent'
    anchor='left'
    open={leftDrawerOpen}
    classes={{
      paper: classes.drawerPaper
    }}
  >
    <ComponentLoader isLoading={isLoading} />

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
      <List
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            {messages['rssFeeds.feeds']}
          </ListSubheader>
        }
      >
        {folders.map((folder: Folder) => (
          <span className={classes.listItem} key={folder.id}>
            <ListItem button>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={folder.name} />
              {openFolders[folder.id]
                ? <ExpandLess onClick={() => handleToggleFolder(folder.id)} />
                : <ExpandMore onClick={() => handleToggleFolder(folder.id)} />
              }
              <ListItemSecondaryAction className={classes.listItemMenu}>
                <IconButton edge='end'>
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {folder.feeds && folder.feeds.map((feed: Feed) => (
              <Collapse in={openFolders[folder.id]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary={feed.name} />
                  </ListItem>
                </List>
              </Collapse>
            ))}
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

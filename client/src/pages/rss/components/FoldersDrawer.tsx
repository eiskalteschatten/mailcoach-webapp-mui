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
  Collapse,
  Menu
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [feedAnchorEl, setFeedAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFeedMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFeedAnchorEl(event.currentTarget);
  };

  const handleFeedMenuClose = () => {
    setFeedAnchorEl(null);
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
                ? <ExpandLessIcon onClick={() => handleToggleFolder(folder.id)} />
                : <ExpandMoreIcon onClick={() => handleToggleFolder(folder.id)} />
              }
              <ListItemSecondaryAction className={classes.listItemMenu}>
                <IconButton edge='end' onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            {folder.feeds && folder.feeds.map((feed: Feed) => (
              <Collapse in={openFolders[folder.id]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary={feed.name} />
                    <ListItemSecondaryAction className={classes.listItemMenu}>
                      <IconButton edge='end' onClick={handleFeedMenuOpen}>
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <Menu
                  anchorEl={feedAnchorEl}
                  open={Boolean(feedAnchorEl)}
                  onClose={handleFeedMenuClose}
                >
                  <List component='nav'>
                    <ListItem button>
                      <ListItemIcon>
                        <CreateIcon />
                      </ListItemIcon>
                      <ListItemText primary={messages['rssFeeds.renameFeed']} />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary={messages['rssFeeds.deleteFeed']} />
                    </ListItem>
                  </List>
                </Menu>
              </Collapse>
            ))}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <List component='nav'>
                <ListItem button>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary={messages['rssFeeds.renameFolder']} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary={messages['rssFeeds.deleteFolder']} />
                </ListItem>
              </List>
            </Menu>
          </span>
        ))}
      </List>
    </div>

    <List>
      <ListItem button>
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary={messages['rssFeeds.addFeedOrFolder']} />
      </ListItem>
    </List>
  </Drawer>);
}

export default FolderDrawer;

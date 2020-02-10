import React, { useState, useContext } from 'react';

import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Menu,
  Button,
  Grid
} from '@material-ui/core';

import AppsIcon from '@material-ui/icons/Apps';

import { IntlContext } from '../intl/IntlContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
}));

const AppMenu: React.FC = () => {
  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<>
    <IconButton onClick={handleOpenClick}>
      <AppsIcon />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Grid container>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </Menu>
  </>);
}

export default AppMenu;

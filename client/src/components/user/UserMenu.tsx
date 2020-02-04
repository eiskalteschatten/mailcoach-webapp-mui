import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Menu,
  Button
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { grey } from '@material-ui/core/colors';

import { State, dispatch } from '../../store';
import { logoutUser } from '../../store/actions/userActions';
import { IntlContext } from '../../intl/IntlContext';

const useStyles = makeStyles((theme: Theme) => {
  const borderBottomColor = theme.palette.type === 'light'
    ? grey[300]
    : '#000000';

  return createStyles({
    wrapper: {
      textAlign: 'center',
      padding: 15
    },
    paddingBottom: {
      paddingBottom: 25
    },
    name: {
      fontWeight: 'bold',
      fontSize: '1.3em'
    },
    logout: {
      borderTop: `1px solid ${borderBottomColor}`,
      paddingTop: 25
    }
  });
});

const UserMenu: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { firstName, lastName, username } = useSelector((state: State) => state.user.user);
  const { messages } = useContext(IntlContext);

  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<>
    <IconButton
        onClick={handleOpenClick}
        edge='end'
      >
      <AccountCircle />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <div className={classes.wrapper}>
        <div className={classes.paddingBottom}>
          <div className={classes.name}>
            { firstName } { lastName }
          </div>

          <div className={classes.paddingBottom}>
            { username }
          </div>

          <Button variant='outlined'>
            { messages['account.manageAccount'] }
          </Button>
        </div>

        <div className={classes.logout}>
          <Button variant='outlined' onClick={() => dispatch(logoutUser())}>
            { messages.logOut }
          </Button>
        </div>
      </div>
    </Menu>
  </>);
}

export default UserMenu;

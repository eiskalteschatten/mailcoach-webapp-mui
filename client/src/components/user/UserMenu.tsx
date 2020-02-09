import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Menu,
  Button,
  FormControlLabel,
  Switch
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { grey } from '@material-ui/core/colors';

import { State } from '../../store';
import { logoutUser, saveUserSettings } from '../../store/actions/userActions';
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
    settings: {
      borderTop: `1px solid ${borderBottomColor}`,
      paddingTop: 15,
      paddingBottom: 15
    },
    logout: {
      borderTop: `1px solid ${borderBottomColor}`,
      paddingTop: 25
    }
  });
});

interface Props extends RouteComponentProps {};

const UserMenu: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { messages } = useContext(IntlContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { firstName, lastName, username } = useSelector((state: State) => state.user.user);
  const { theme } = useSelector((state: State) => state.user.settings);
  const [darkMode, setDarkMode] = useState<boolean>(theme === 'dark');

  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleManageAccountClick = () => {
    handleClose();
    props.history.push('/account');
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const theme = event.target.checked ? 'dark' : 'light';
    setDarkMode(!!event.target.checked);
    dispatch(saveUserSettings({ theme }));
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

          <Button variant='outlined' onClick={handleManageAccountClick}>
            { messages['account.manageAccount'] }
          </Button>
        </div>

        <div className={classes.settings}>
          <FormControlLabel
            control={
              <Switch checked={darkMode} onChange={handleDarkModeChange} />
            }
            label={messages['account.darkMode']}
          />
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

export default withRouter(UserMenu);

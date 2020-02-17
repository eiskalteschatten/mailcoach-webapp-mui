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
  Grid,
  FormControlLabel,
  Switch,
  MenuItem
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { grey } from '@material-ui/core/colors';

import { State } from '../store';
import { logoutUser, saveUserSettings } from '../store/actions/userActions';
import { IntlContext } from '../intl/IntlContext';

const useStyles = makeStyles((theme: Theme) => {
  const borderBottomColor = theme.palette.type === 'light'
    ? grey[300]
    : '#000000';

  return createStyles({
    wrapper: {
      textAlign: 'center',
      padding: 15,
      [theme.breakpoints.up('sm')]: {
        minWidth: 350
      }
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
    languageSelectorWrapper: {
      textAlign: 'right'
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
  const { messages, switchLocale } = useContext(IntlContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorLangEl, setAnchorLangEl] = useState<null | HTMLElement>(null);
  const { firstName, lastName, username } = useSelector((state: State) => state.user.user);
  const { theme } = useSelector((state: State) => state.user.settings);
  const [darkMode, setDarkMode] = useState<boolean>(theme === 'dark');

  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLangClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLangEl(event.currentTarget);
  };

  const handleLangClose = () => {
    setAnchorLangEl(null);
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

  const handleLanguageChange = (language: string) => {
    handleLangClose();
    switchLocale(language);
    dispatch(saveUserSettings({ language }));
  };

  return (<>
    <IconButton
        onClick={handleOpenClick}
        edge='end'
      >
      <AccountCircleIcon />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
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

        <Grid container className={classes.settings}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch checked={darkMode} onChange={handleDarkModeChange} />
              }
              label={messages['account.darkMode']}
            />
          </Grid>
          <Grid item xs={6} className={classes.languageSelectorWrapper}>
            <Button
              onClick={handleOpenLangClick}
            >
              <LanguageIcon />
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorLangEl}
              keepMounted
              open={Boolean(anchorLangEl)}
              onClose={handleLangClose}
            >
              <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('de')}>Deutsch</MenuItem>
            </Menu>
          </Grid>
        </Grid>

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

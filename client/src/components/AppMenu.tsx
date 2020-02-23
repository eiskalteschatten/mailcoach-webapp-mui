import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Menu,
  ButtonBase,
  Grid
} from '@material-ui/core';

import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RssFeedIcon from '@material-ui/icons/RssFeed';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    width: 75,
    height: 75,
    [theme.breakpoints.up('sm')]: {
      width: 125,
      height: 125,
    },
    textAlign: 'center',
    borderRadius: 5,
    margin: '5px 10px',
    display: 'block'
  },
  buttonIcon: {
    fontSize: 45,
    [theme.breakpoints.up('sm')]: {
      fontSize: 50
    }
  },
  buttonLabel: {
    fontSize: 13,
    [theme.breakpoints.up('sm')]: {
      fontSize: 15
    },
    paddingTop: 5
  }
}));

interface Props extends RouteComponentProps {};

const AppMenu: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (route: string) => {
    handleClose();
    props.history.push(route);
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
      <Grid container spacing={0} justify='space-evenly'>
        <Grid item xs={6}>
          <ButtonBase className={classes.button} onClick={() => handleButtonClick('/')}>
            <DashboardIcon className={classes.buttonIcon} />
            <div className={classes.buttonLabel}>
              <FormattedMessage id='dashboard' />
            </div>
          </ButtonBase>
        </Grid>
        <Grid item xs={6}>
          <ButtonBase className={classes.button} onClick={() => handleButtonClick('/rss')}>
            <RssFeedIcon className={classes.buttonIcon} />
            <div className={classes.buttonLabel}>
              <FormattedMessage id='rssFeeds' />
            </div>
          </ButtonBase>
        </Grid>
      </Grid>
    </Menu>
  </>);
}

export default withRouter(AppMenu);

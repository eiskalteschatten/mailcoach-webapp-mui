import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  makeStyles,
  Theme,
  createStyles,
  Button
} from '@material-ui/core';

import { State } from '../../store';
import { getAllUserSessions, logOutAllOtherUserSessions } from '../../store/actions/userActions';
import { UserSessions } from '../../store/reducers/userReducer';
import classes from '*.module.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sessions: {
    paddingTop: theme.spacing(4)
  },
  loginDate: {
    fontWeight: 'bold',
    paddingBottom: theme.spacing(1)
  },
  thisSession: {
    fontWeight: 'bold'
  }
}));

const SessionManagement: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sessions = useSelector((state: State) => state.user.sessions);
  const instanceId = useSelector((state: State) => state.user.instanceId);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getAllUserSessions());
    }
  }, [sessions, dispatch])

  return (<>
    <Button
      variant='contained'
      onClick={() => dispatch(logOutAllOtherUserSessions())}
    >
      <FormattedMessage id='account.logOutAllOtherSessions' />
    </Button>

    <div className={classes.sessions}>
      <div className={classes.loginDate}>
        <FormattedMessage id='account.loginDate' />
      </div>

      {sessions.map((session: UserSessions): any =>
        <div>
          {session.instanceId === instanceId ? (
            <span className={classes.thisSession}>{session.loginDate} (<FormattedMessage id='account.thisSession' />)</span>
          ) : (
            <span>{session.loginDate}</span>
          )}
        </div>
      )}
    </div>
  </>);
}

export default SessionManagement;


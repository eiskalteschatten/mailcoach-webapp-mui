import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {
  makeStyles,
  Theme,
  createStyles,
  Button
} from '@material-ui/core';

import { State } from '../../store';

interface UserSessions {
  loginDate?: Date;
  instanceId?: string;
}

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
  const [sessions, setSessions] = useState<UserSessions[] | undefined>();
  const instanceId = useSelector((state: State) => state.user.instanceId);

  const logOutAllOtherUserSessions = async (): Promise<void> => {
    await axios.post('/api/auth/users/sessions/logout', { instanceId });
    const res: any = await axios.get('/api/auth/users/sessions');
    setSessions(res.data.sessions)
  };

  useEffect((): void => {
    if (!sessions) {
      axios.get('/api/auth/users/sessions')
        .then((res: any) => setSessions(res.data.sessions))
        .catch(console.error);
    }
  }, [sessions]);

  return (<>
    <Button
      variant='contained'
      onClick={logOutAllOtherUserSessions}
    >
      <FormattedMessage id='account.logOutAllOtherSessions' />
    </Button>

    <div className={classes.sessions}>
      <div className={classes.loginDate}>
        <FormattedMessage id='account.loginDate' />
      </div>

      {sessions && sessions.map((session: UserSessions): any =>
        <div key={session.instanceId}>
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


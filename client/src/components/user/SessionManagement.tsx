import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Button
} from '@material-ui/core';

import { dispatch } from '../../store';
import { getAllUserSessions, logOutAllOtherUserSessions } from '../../store/actions/userActions';

const useAllUserSessions = () => {
  useEffect(() => {
    dispatch(getAllUserSessions());
  }, [])
}

const SessionManagement: React.FC = () => {
  // useAllUserSessions();

  return (<>
    <Button
      variant='contained'
      onClick={() => dispatch(logOutAllOtherUserSessions())}
    >
      <FormattedMessage id='account.logOutAllOtherSessions' />
    </Button>
  </>);
}

export default SessionManagement;


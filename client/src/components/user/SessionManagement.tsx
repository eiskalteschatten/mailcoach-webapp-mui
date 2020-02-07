import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  Button
} from '@material-ui/core';

import { getAllUserSessions, logOutAllOtherUserSessions } from '../../store/actions/userActions';

const SessionManagement: React.FC = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllUserSessions());
  // }, [dispatch])

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


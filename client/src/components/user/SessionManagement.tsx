import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Button
} from '@material-ui/core';

import { dispatch } from '../../store';
import { updateUserSelf } from '../../store/actions/userActions';

const SessionManagement: React.FC = () => {
  return (<>
    <Button variant='contained'>
      <FormattedMessage id='account.logOutAllOtherSessions' />
    </Button>
  </>);
}

export default SessionManagement;


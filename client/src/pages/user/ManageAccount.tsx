import React, { useContext } from 'react';

import {
  Container,
  Grid,
  CardHeader,
  CardContent
} from '@material-ui/core';

import { IntlContext } from '../../intl/IntlContext';

import LoadingCard from '../../components/elements/LoadingCard';
import UserAccountForm from './components/UserAccountForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import SessionManagement from './components/SessionManagement';

const ManageAccount: React.FC = () => {
  const { messages } = useContext(IntlContext);

  return (<Container>
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <LoadingCard>
          <CardHeader
            title={messages['account.accountInformation']}
          />

          <CardContent>
            <UserAccountForm />
          </CardContent>
        </LoadingCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <LoadingCard>
          <CardHeader
            title={messages['account.updatePassword']}
          />

          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </LoadingCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <LoadingCard>
          <CardHeader
            title={messages['account.sessionManagement']}
          />

          <CardContent>
            <SessionManagement />
          </CardContent>
        </LoadingCard>
      </Grid>
    </Grid>
  </Container>);
}

export default ManageAccount;

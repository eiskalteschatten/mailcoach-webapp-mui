import React, { useContext } from 'react';

import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';

import { IntlContext } from '../../intl/IntlContext';

import UserAccountForm from '../../components/user/UserAccountForm';
import ChangePasswordForm from '../../components/user/ChangePasswordForm';
import SessionManagement from '../../components/user/SessionManagement';

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    padding: theme.spacing(3)
  },
  paddedTitle: {
    paddingBottom: theme.spacing(3)
  }
}));

const ManageAccount: React.FC = () => {
  const classes = useStyles();
  const { messages } = useContext(IntlContext);

  return (<Container>
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <CardHeader
            title={messages['account.accountInformation']}
          />

          <CardContent>
            <UserAccountForm />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <CardHeader
            title={messages['account.updatePassword']}
          />

          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <CardHeader
            title={messages['account.sessionManagement']}
          />

          <CardContent>
            <SessionManagement />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>);
}

export default ManageAccount;

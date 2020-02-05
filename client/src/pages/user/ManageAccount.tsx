import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';

import UserAccountForm from '../../components/user/UserAccountForm';
import ChangePasswordForm from '../../components/user/ChangePasswordForm';
import SessionManagement from '../../components/user/SessionManagement';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(3)
  },
  paddedTitle: {
    paddingBottom: theme.spacing(3)
  }
}));

const ManageAccount: React.FC = () => {
  const classes = useStyles();

  return (<Container>
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant='h5'>
            <FormattedMessage id='account.accountInformation' />
          </Typography>

          <UserAccountForm />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant='h5'>
            <FormattedMessage id='account.updatePassword' />
          </Typography>

          <ChangePasswordForm />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant='h5' className={classes.paddedTitle}>
            <FormattedMessage id='account.sessionManagement' />
          </Typography>

          <SessionManagement />
        </Paper>
      </Grid>
    </Grid>
  </Container>);
}

export default ManageAccount;

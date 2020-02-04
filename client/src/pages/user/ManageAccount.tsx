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

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(3)
  }
}));

const ManageAccount: React.FC = () => {
  const classes = useStyles();

  return (<Container>
    <Grid
      container
      spacing={2}
      justify='center'
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
    </Grid>
  </Container>);
}

export default ManageAccount;

import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent
} from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';

import { IntlContext } from '../../intl/IntlContext';
import { getAllUserSessions } from '../../store/actions/userActions';

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
  const dispatch = useDispatch();
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
            action={
              <IconButton onClick={() => dispatch(getAllUserSessions())}>
                <RefreshIcon />
              </IconButton>
            }
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

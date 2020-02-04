import React from 'react';
import { useSelector } from 'react-redux';

import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Grid,
  Paper,
  Button
} from '@material-ui/core';

import { State, dispatch } from '../../store';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(2)
  }
}));

const ManageAccount: React.FC = () => {
  const classes = useStyles();
  const user = useSelector((state: State) => state.user.user);

  return (<Container>
    <Grid
      container
      spacing={2}
      justify='center'
      alignItems='center'
    >
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          test
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          test
        </Paper>
      </Grid>
    </Grid>
  </Container>);
}

export default ManageAccount;

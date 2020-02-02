import React from 'react';
import { useSelector } from 'react-redux';

import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardContent
} from '@material-ui/core';

import { State } from '../store';

import Error from '../components/messages/InlineError';
import LoginForm from '../components/login/LoginForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
      margin: 'auto'
    }
  })
);

const Login: React.FC = () => {
  const classes = useStyles();
  const formError = useSelector((state: State) => state.app.formError);

  return (<Card className={classes.root}>
    <CardContent>
      {formError &&
        <Error messageId={formError} />
      }

      <LoginForm />
    </CardContent>
  </Card>);
};

export default Login;

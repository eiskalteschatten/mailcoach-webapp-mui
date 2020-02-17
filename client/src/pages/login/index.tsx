import React from 'react';
import { useSelector } from 'react-redux';

import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardContent
} from '@material-ui/core';

import { State } from '../../store';

import Error from '../../components/messages/InlineError';
import LoginForm from './components/LoginForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 75
    },
    card: {
      maxWidth: 500,
      margin: 'auto'
    },
    logo: {
      marginTop: 50,
      marginBottom: 50,
      textAlign: 'center'
    }
  })
);

const Login: React.FC = () => {
  const classes = useStyles();
  const formError = useSelector((state: State) => state.app.formError);

  return (<div className={classes.root}>
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.logo}>
          logo here
        </div>

        {formError &&
          <Error messageId={formError} />
        }

        <LoginForm />
      </CardContent>
    </Card>
  </div>);
};

export default Login;

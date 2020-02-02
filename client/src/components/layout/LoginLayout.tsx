import React from 'react';

import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';

import Login from '../../pages/Login';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginTop: 50,
      marginBottom: 50,
      textAlign: 'center'
    }
  })
);


interface Props {
  children?: any;
}

const LoginLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (<div>
    <div className={classes.logo}>
      logo here
    </div>

    <Login />
  </div>);
}

export default LoginLayout;

import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  Theme,
  createStyles,
  Card
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    padding: theme.spacing(3),
    position: 'relative'
  }
}));

const LoadingCard: React.FC<any> = (props: any) => {
  const classes = useStyles();

  return (<Card
    className={clsx(classes.card, props.className)}
    {...props}
  >
    {props.children}
  </Card>);
}

export default LoadingCard;

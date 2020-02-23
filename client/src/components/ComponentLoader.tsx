import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import {
  createStyles,
  makeStyles,
  Theme,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 10000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      animation: '$fadein 800ms'
    },
    hasBackground: {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.4)',
    },
    '@keyframes fadein': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    hidden: {
      display: 'none'
    }
  })
);

interface Props {
  isLoading: boolean;
  noBackground?: boolean;
}

const ComponentLoader: React.FC<Props> = ({ isLoading, noBackground }: Props) => {
  const classes = useStyles();
  const [localIsLoading, setLocalIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setLocalIsLoading(false), 1000);
    }
    else {
      setLocalIsLoading(true);
    }
  }, [isLoading]);

  return (<div className={clsx({
      [classes.root]: true,
      [classes.hasBackground]: !noBackground,
      [classes.hidden]: !localIsLoading
    })}>
    <CircularProgress size={40} />
  </div>);
}

export default ComponentLoader;

import React, { ComponentType, FunctionComponent } from 'react';

import {
  createStyles,
  withStyles,
  Hidden
} from '@material-ui/core';

const styles = () => createStyles({
  wrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    minHeight: '0'
  },
  mainColumn: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%'
  },
  sideColumn: {
    flex: 1,
    overflow: 'auto',
    minHeight: '100%',
    minWidth: 250,
    maxWidth: 350
  }
});

interface Options {
  leftSidebar?: ComponentType | FunctionComponent<any>;
  rightSidebar?: ComponentType | FunctionComponent<any>;
}

const withSidebars = (options: Options): Function => {
  const { leftSidebar: LeftSidebar, rightSidebar: RightSidebar } = options;

  if (!LeftSidebar && !RightSidebar) {
    console.error('You must define either a left or right sidebar when using withSidebars!');
    return () => {};
  }

  return (MainComponent: ComponentType) => {
    function render(props: any): JSX.Element {
      const { classes } = props;

      return <div className={classes.wrapper}>
        {LeftSidebar && (
          <Hidden mdDown>
            <div className={classes.sideColumn}>
              <LeftSidebar />
            </div>
          </Hidden>
        )}
        <div className={classes.mainColumn}>
          <MainComponent {...props} />
        </div>
        {RightSidebar && (
          <Hidden mdDown>
            <div className={classes.sideColumn}>
              <RightSidebar />
            </div>
          </Hidden>
        )}
      </div>
    }

    return withStyles(styles)(render);
  };
};

export default withSidebars;

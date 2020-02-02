import React, { ReactElement, ComponentType, FunctionComponent } from 'react';

const withToolbar = (Toolbar: ComponentType | FunctionComponent<any>): Function => {
  return (MainComponent: ComponentType): React.FC => {
    return function render(props): ReactElement {
      return <>
        <div style={{ flex: 0 }}>
          <Toolbar />
        </div>
        <MainComponent {...props} />
      </>
    }
  }
};

export default withToolbar;

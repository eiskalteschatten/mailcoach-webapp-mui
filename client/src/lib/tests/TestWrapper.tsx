import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store';

interface Props {
  children?: any;
}

const TestWrapper: React.FC<Props> = ({ children }) => {
  return (<BrowserRouter>
    <Provider store={store}>
      {children}
    </Provider>
  </BrowserRouter>);
}

export default TestWrapper;

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline }  from '@material-ui/core';

import GeneralWrapper from './GeneralWrapper';
import GeneralError from './components/GeneralError';
import { IntlProviderWrapper } from './intl/IntlContext';

import theme from './theme';
import store from './store'
import bootstrap from './bootstrap';

import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <IntlProviderWrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <GeneralWrapper />
          <GeneralError />
        </Provider>
      </ThemeProvider>
    </IntlProviderWrapper>
  );
}

export default App;

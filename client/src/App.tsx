import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline }  from '@material-ui/core';

import GeneralWrapper from './GeneralWrapper';
import GeneralError from './components/messages/GeneralError';
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
        <BrowserRouter>
          <Provider store={store}>
            <GeneralWrapper />
            <GeneralError />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </IntlProviderWrapper>
  );
}

export default App;

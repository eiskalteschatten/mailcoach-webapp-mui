import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, createMuiTheme }  from '@material-ui/core';

import { State } from './store';

import GeneralWrapper from './GeneralWrapper';
import GeneralError from './components/messages/GeneralError';
import { IntlProviderWrapper } from './intl/IntlContext';

import themeOptions from './theme';
import bootstrap from './bootstrap';

import './App.css';

const App: React.FC = () => {
  const { theme } = useSelector((state: State) => state.user.settings);
  const userSettingsString = localStorage.getItem('userSettings');
  let userSettings;

  if (userSettingsString) {
    userSettings = JSON.parse(userSettingsString);
  }

  const type = theme
    ? theme
    : userSettings && userSettings.theme
      ? userSettings.theme
      : 'light';

  const muiTheme = createMuiTheme({
    ...themeOptions,
    palette: {
      ...themeOptions.palette,
      type
    }
  });

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <IntlProviderWrapper>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <GeneralWrapper />
          <GeneralError />
        </BrowserRouter>
      </ThemeProvider>
    </IntlProviderWrapper>
  );
}

export default App;

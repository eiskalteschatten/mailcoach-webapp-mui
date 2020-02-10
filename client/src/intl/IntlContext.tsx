import React, { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

import enMessages from './en';
import deMessages from './de';

const userSettingsString = localStorage.getItem('userSettings');
let userSettings;

if (userSettingsString) {
  userSettings = JSON.parse(userSettingsString);
}

const defaultLocale = userSettings ? userSettings.language : 'en';

const availableLocales: string[] = ['en', 'de'];

const allMessages: any = {
  en: enMessages,
  de: deMessages
};

const Context = createContext({
  locale: defaultLocale,
  defaultLocale,
  availableLocales,
  messages: allMessages[defaultLocale],
  switchLocale: (switchToLocale: string) => {},
});

interface Props {
  children?: any;
  injectedLocale?: string;
}

const IntlProviderWrapper: React.FC<Props> = ({ children, injectedLocale }) => {
  const standardLocale = injectedLocale || defaultLocale;
  const [locale, setLocale] = useState<string>(standardLocale);
  const [messages, setMessages] = useState(allMessages[standardLocale]);

  const switchLocale = (switchToLocale: string) => {
    setLocale(switchToLocale);
    setMessages(allMessages[switchToLocale]);
  };

  return (
    <Context.Provider value={{
      locale,
      defaultLocale,
      availableLocales,
      messages,
      switchLocale
    }}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  );
}

export { IntlProviderWrapper, Context as IntlContext };

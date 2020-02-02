import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

const createComponentWithIntl = (children: any, props = {locale: 'en'}): ReactTestRenderer => {
  return renderer.create(<IntlProvider {...props}>{children}</IntlProvider>);
};

export default createComponentWithIntl;

import React from 'react';
import { ReactWrapper } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

import { mountWithIntl } from '../../lib/tests/intlTest';
import TestWrapper from '../../lib/tests/TestWrapper';

import LoginLayout from './LoginLayout';

describe('LoginLayout', () => {
  let mount: any;
  let wrapper: ReactWrapper;

  beforeAll(() => {
    mount = createMount();
    wrapper = mountWithIntl(<TestWrapper>
      <LoginLayout />
    </TestWrapper>);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });
});

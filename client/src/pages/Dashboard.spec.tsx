import React from 'react';
import { ReactWrapper } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

import { mountWithIntl } from '../lib/tests/intlTest';
import TestWrapper from '../lib/tests/TestWrapper';

import Dashboard from './Dashboard';

describe('Dashboard', () => {
  let mount: any;
  let wrapper: ReactWrapper;

  beforeAll(() => {
    mount = createMount();
    wrapper = mountWithIntl(<TestWrapper>
      <Dashboard />
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

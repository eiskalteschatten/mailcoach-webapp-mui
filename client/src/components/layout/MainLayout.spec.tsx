import React from 'react';
import { ReactWrapper } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

import TestWrapper from '../../lib/tests/TestWrapper';
import MainLayout from './MainLayout';

describe('MainLayout', () => {
  let mount: any;
  let wrapper: ReactWrapper;

  beforeAll(() => {
    mount = createMount();
    wrapper = mount(<TestWrapper>
      <MainLayout />
    </TestWrapper>);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  it('has menubar', () => {
    expect(wrapper.exists('.MuiAppBar-root')).toBeTruthy();
  });
});

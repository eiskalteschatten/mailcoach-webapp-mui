import React from 'react';
import { shallow } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

import Login from './Login';

describe('Login', () => {
  let mount: any;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });
});

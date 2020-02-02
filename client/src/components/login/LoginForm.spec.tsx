import React from 'react';
import { shallow } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let mount: any;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('has form', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.exists('form')).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

import App from './App';

describe('App', () => {
  let mount: any;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});

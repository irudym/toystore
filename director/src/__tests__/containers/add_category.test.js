import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AddCategory } from '../../client/containers/add_category';

// configure Enzyme with adapter
Enzyme.configure({ adapter: new Adapter() });


describe('AddCategory component', () => {
  it('renders correctly', () => {
    // const wrapper = mount(<AddCategory />);
    // expect(wrapper).toMatchSnapshot();
  });
});

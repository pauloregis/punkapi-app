import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PropRoutes from './PropRoutes';
import { Route } from 'react-router-dom';

describe('<PropRoutes />', () => {

  it('should render a <Route /> component', () => {
    const wrapper = shallow(
      <PropRoutes />
    );

    expect(wrapper.find(Route)).to.have.length(1);
  });
});
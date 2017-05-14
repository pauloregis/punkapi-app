import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ActiveFilterItem from './';

describe('<ActiveFilterItem />', () => {

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <ActiveFilterItem>Any Text</ActiveFilterItem>
    );

    expect(wrapper.contains(
      <li className="current_filter__item">
        <span>Any Text</span>
      </li>
    )).to.equal(true);
  });

});


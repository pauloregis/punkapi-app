import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from './index';
import Search from './Search';

describe('<Header />', () => {

  it('should render <Search/> Component', () => {
    const props = {
      handleSearch: () => {}
    };
    const wrapper = shallow(
      <Header {...props}/>
    );

    expect(wrapper.find(Search)).to.have.length(1);
  });

});
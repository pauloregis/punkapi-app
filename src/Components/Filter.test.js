import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Filter from './Filter';
import SliderWithTooltip from './SliderWithTooltip';

describe('<Filter />', () => {

  it('should render <SliderWithTooltip/> Component', () => {
    const wrapper = shallow(
      <Filter/>
    );

    expect(wrapper.find(SliderWithTooltip)).to.have.length(4);
  });

  it('should render <SliderWithTooltip/> Component', () => {
    const resetFilter = jest.fn(() => {});
    const queryFilter = {
      page: 1,
      per_page: 6,
      abv_gt: 10,
      abv_lt: 50,
      ibu_gt: 10,
      ibu_lt: 50,
      ebc_gt: 10,
      ebc_lt: 50,
      brewed_after: '01-2009',
      brewed_before: '01-2016'
    };

    const wrapper = mount(
      <Filter resetFilter={resetFilter} queryFilter={queryFilter} />
    );

    wrapper.find('button').simulate('click');

    expect(resetFilter.mock.calls.length).to.be.equal(1);
  });

});
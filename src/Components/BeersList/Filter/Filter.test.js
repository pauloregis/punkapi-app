import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import Filter from './index';
import sinon from 'sinon';
import SliderWithTooltip from './SliderWithTooltip';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('<Filter />', () => {

  it('should render <SliderWithTooltip/> Component', () => {
    const wrapper = shallow(
      <Filter/>
    );

    expect(wrapper.find(SliderWithTooltip)).to.have.length(4);
  });

  it('should render <SliderWithTooltip/> Component', () => {
    const changeFilter = jest.fn(() => {});
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
      <Filter changeFilter={changeFilter} queryFilter={queryFilter} />
    );

    wrapper.find('button').simulate('click');

    expect(changeFilter.mock.calls.length).to.be.equal(1);
  });

});
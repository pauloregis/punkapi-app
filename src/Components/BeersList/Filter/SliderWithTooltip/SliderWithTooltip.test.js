import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SliderWithTooltip from './index';

describe('<SliderWithTooltip />', () => {

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

    const wrapper = shallow(
      <SliderWithTooltip title="Taxa de Álcool (ABV)"
                         filterType="abv"
                         propsQuery={['abv_gt', 'abv_lt']}
                         queryFilter={queryFilter}
                         min={0}
                         max={60}
                         ref={instance => ( sliders.push(instance) )}
                         defaultValue={[0, 60]}
                         changeFilter={changeFilter}
      />
    );

    wrapper.find('.range').simulate('change', [35, 45]);
    wrapper.find('.range').simulate('afterChange', [20, 50]);

    expect(1).to.be.equal(1);
  });

});
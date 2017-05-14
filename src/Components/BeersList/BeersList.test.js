import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BeersList from './index';
import BeerCard from './BeerCard';
import { beer } from './../../Utils/tests/beer';

describe('<BeersList />', () => {

  let props;

  beforeEach(() => {
    props = {
      beers: beer,
      pagination: {
        beersLength: 1
      }
    };
  });

  it('should render <BeerCard />', () => {
    const wrapper = shallow(
      <BeersList {...props} />
    );

    expect(wrapper.find(BeerCard)).to.have.length(1)
  });

  it('should render load more button', () => {
    props = {
      beers: beer,
      pagination: {
        beersLength: 6
      }
    };
    const wrapper = shallow(
      <BeersList {...props} />
    );

    expect(wrapper.find('button')).to.have.length(1)
  });
});
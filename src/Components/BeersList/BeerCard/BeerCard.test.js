import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BeerCard from './index';

describe('<BeerCard />', () => {

  let beer;

  beforeEach(() => {
    beer = {
      id: 1,
      name: 'name',
      tagline: 'tagline',
      image_url: 'http://',
    }
  });

  it('should render <BeerCard/>', () => {
    const wrapper = shallow(
      <BeerCard beer={beer}/>
    );

    expect(wrapper.find('.card_item')).to.have.length(1);
  });

  it('should return " - " when abv, ibu, ebc are undefined', () => {
    const wrapper = shallow(
      <BeerCard beer={beer}/>
    );

    const test = wrapper.find('.card_item__details__value').everyWhere(( node ) =>
      ( node.text() === ' - ' )
    );

    expect(test).to.be.equal(true);
  });

});
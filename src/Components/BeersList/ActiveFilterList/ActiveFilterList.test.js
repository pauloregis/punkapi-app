import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ActiveFilterList from './index';
import ActiveFilterItem from './ActiveFilterItem';

describe('<ActiveFilterList />', () => {
  it('should render no one <ActiveFilterItem /> components', () => {
    const wrapper = shallow(
      <ActiveFilterList
        queryFilter={{
          page: 1,
          per_page: 6
        }}
      />
    );
    expect(wrapper.find(ActiveFilterItem)).to.have.length(0);
  });

  it('should render one <ActiveFilterItem /> components', () => {
    const wrapper = shallow(
      <ActiveFilterList
        queryFilter={{
          page: 1,
          per_page: 6,
          brewed_after: '01-2008',
          brewed_before: '01-2016'
        }}
      />
    );
    expect(wrapper.find(ActiveFilterItem)).to.have.length(1);
  });

  it('should render two <ActiveFilterItem /> components', () => {
    const wrapper = shallow(
      <ActiveFilterList
        queryFilter={{
          page: 1,
          per_page: 6,
          brewed_after: '01-2008',
          brewed_before: '01-2016',
          abv_gt: '10',
          abv_lt: '50'
        }}
      />
    );
    expect(wrapper.find(ActiveFilterItem)).to.have.length(2);
  });

  it('should render three <ActiveFilterItem /> components', () => {
    const wrapper = shallow(
      <ActiveFilterList
        queryFilter={{
          page: 1,
          per_page: 6,
          brewed_after: '01-2008',
          brewed_before: '01-2016',
          abv_gt: '10',
          abv_lt: '50',
          ibu_gt: '10',
          ibu_lt: '30',
        }}
      />
    );
    expect(wrapper.find(ActiveFilterItem)).to.have.length(3);
  });

  it('should render four <ActiveFilterItem /> components', () => {
    const wrapper = shallow(
      <ActiveFilterList
        queryFilter={{
          page: 1,
          per_page: 6,
          brewed_after: '01-2008',
          brewed_before: '01-2016',
          abv_gt: '10',
          abv_lt: '50',
          ibu_gt: '10',
          ibu_lt: '30',
          ebc_gt: '5',
          ibc_lt: '20',
        }}
      />
    );
    expect(wrapper.find(ActiveFilterItem)).to.have.length(4);
  });

  it('should render five <ActiveFilterItem /> components', () => {
    const wrapper = shallow(
      <ActiveFilterList
        queryFilter={{
          page: 1,
          per_page: 6,
          brewed_after: '01-2008',
          brewed_before: '01-2016',
          abv_gt: '10',
          abv_lt: '50',
          ibu_gt: '10',
          ibu_lt: '30',
          ebc_gt: '5',
          ibc_lt: '20',
          beer_name: 'beer'
        }}
      />
    );
    expect(wrapper.find(ActiveFilterItem)).to.have.length(5);
  });
});


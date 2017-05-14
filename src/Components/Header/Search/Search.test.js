import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Search from './index';

describe('<Search />', () => {

  let props, wrapper;

  beforeEach(() => {
    props = {
      handleSearch: jest.fn(() => {})
    };
    wrapper = shallow(
      <Search {...props}/>
    );
  });

  it('should render a <Search/> Component', () => {
    expect(wrapper.find('.search')).to.have.length(1);
  });

  it('should update value in state when input change', () => {
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });

    expect(wrapper.state('value')).to.be.equal('hello');
  });

  it('should called handleSearch when click on search button', () => {
    wrapper.setState({ value: 'foo' });
    wrapper.find('button').simulate('click');

    expect(props.handleSearch.mock.calls.length).to.be.equal(1);
  });

  it('should called handleSearch when press enter with any value in input', () => {
    wrapper.find('input').simulate('keyUp', { key: 'Enter', which: 13, target: { value: 'hello' } });
    wrapper.find('input').simulate('keyUp', { key: 'Enter', keyCode: 13, target: { value: 'hello' } });
    wrapper.find('input').simulate('keyUp', { key: 'Enter', keyCode: 13, target: { value: '' } });

    expect(props.handleSearch.mock.calls.length).to.be.equal(2);
  });

  it('should not called handleSearch when click on search button without input value', () => {
    wrapper.setState({ value: '' });
    wrapper.find('button').simulate('click');

    expect(props.handleSearch.mock.calls.length).to.be.equal(0);
  });

});
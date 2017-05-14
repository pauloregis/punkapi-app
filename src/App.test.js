import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import App from './App';
import { beers } from './Utils/tests/beer';
import { MemoryRouter } from 'react-router-dom';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('<App />', () => {

  it('calls componentDidMount', () => {
    const componentDidMountSpy = sinon.spy(App.prototype, 'componentDidMount');

    mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(componentDidMountSpy).to.have.been.calledOnce;
  });

  it('should render a cards list with 12 items when click on button-loading_more button', (done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const res = {
      json: () => {
        return new Promise((resolve) => {
          resolve(beers);
        });
      }
    };
    const fetchedStub = sinon.stub(global, 'fetch').returns(
        new Promise((resolve) => {
          resolve(res)
        })
      );
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    setTimeout(function() {
      wrapper.find('.button-loading_more').simulate('click');
      setTimeout(function() {
        expect(wrapper.find('.card_item')).to.have.length(12);
        fetchedStub.restore();
        done();
      }, 50);
    }, 50);

  });

  it('should call changeFilter ', (done) => {
    const res = {
      json: () => {
        return new Promise((resolve) => {
          resolve(beers);
        });
      }
    };
    const componentChangeFilterSpy = sinon.spy(App.prototype, 'changeFilter');
    const fetchedStub = sinon.stub(global, 'fetch').returns(
      new Promise((resolve) => {
        resolve(res)
      })
    );
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    setTimeout(function() {
      wrapper.find('.button-reset').simulate('click');
      expect(componentChangeFilterSpy).to.have.been.calledOnce;
      fetchedStub.restore();
      done();
    }, 50);

  });

  it('should call handleSearch when click on search button', () => {
    const res = {
      json: () => {
        return new Promise((resolve) => {
          resolve(beers);
        });
      }
    };
    const fetchedStub = sinon.stub(global, 'fetch').returns(
      new Promise((resolve) => {
        resolve(res)
      })
    );
    const handleSearchSpy = sinon.spy(App.prototype, 'handleSearch');
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('keyUp', { key: 'Enter', which: 13, target: { value: 'hello' } });

    expect(handleSearchSpy).to.have.been.calledOnce;
    fetchedStub.restore();
  });
});
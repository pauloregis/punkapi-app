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

  it.skip('calls componentDidMount', () => {
    const componentDidMountSpy = sinon.spy(App.prototype, 'componentDidMount');

    mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(componentDidMountSpy).to.have.been.calledOnce;
  });

  it('should render a cards list with 6 items', () => {
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

    expect(wrapper.find('.card_item')).to.have.length(6);
    fetchedStub.restore();
  });
});
import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import Beer from './index';
import { beer } from './../../Utils/tests/beer';
import { MemoryRouter } from 'react-router-dom'

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('<Beer />', () => {

  let props;
  let fetchedStub;
  let fetchedSpy;
  let promise;
  let res;

  beforeEach(() => {
    props = {
      beers: beer,
      match: {
        params: {
          id: 1
        }
      }
    };
    res = {
      json: () => {
        return beer;
      }
    };
  });

  afterEach( () => {

  });

  it('calls componentDidMount', () => {
    fetchedSpy = sinon.spy(Beer.prototype, 'componentDidMount');

    const wrapper = mount(
      <MemoryRouter>
        <Beer {...props} />
      </MemoryRouter>
    );

    expect(fetchedSpy).to.have.been.calledOnce;
    fetchedSpy.restore();
  });

  it('calls componentWillReceiveProps', () => {
    fetchedSpy = sinon.spy(Beer.prototype, 'componentWillReceiveProps');
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
    promise.resolves(res);

    const wrapper = mount(
      <MemoryRouter>
        <Beer {...props} />
      </MemoryRouter>
    );

    wrapper.setProps({
      match: {
        params: {
          id: 10
        }
      }
    });

    expect(fetchedSpy).to.have.been.calledOnce;
    fetchedStub.restore();
    fetchedSpy.restore();
  });

  it('calls getBeer', () => {
    fetchedSpy = sinon.spy(Beer.prototype, 'getBeer');
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
    promise.resolves(res);

    props = {
      beers: beer,
      match: {
        params: {
          id: 20
        }
      }
    };

    const wrapper = mount(
      <MemoryRouter>
        <Beer {...props} />
      </MemoryRouter>
    );

    expect(fetchedSpy).to.have.been.calledOnce;
    fetchedStub.restore();
    fetchedSpy.restore();
  });

  it('should render component when the prop beer is not passed ', () => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
    promise.resolves(res);

    props = {
      beers: beer,
      match: {
        params: {
          id: 10
        }
      }
    };

    const wrapper = mount(
      <MemoryRouter>
        <Beer {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('.single__content')).to.have.length(1);
  });
});
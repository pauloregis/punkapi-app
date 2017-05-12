import React from 'react';
import { Switch } from 'react-router-dom';

import Header from './Header';
import Beer from './Beer';
import BeersList from './BeersList';
import PropsRoute from './PropRoutes';

const Container = (props) => (
  <div className="App">
    <Header
      handleSearch={props.handleSearch}
    />
    <div className="main">
      <Switch>
        <PropsRoute
          exact
          path='/'
          component={BeersList}
          {...props}
        />
        <PropsRoute
          exact
          path='/beers'
          component={BeersList}
          {...props}
        />
        <PropsRoute
          path='/beers/:id'
          component={Beer}
          beers={props.beers}
        />
      </Switch>
    </div>
  </div>
);

export default Container;
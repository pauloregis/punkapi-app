import React, { Component } from 'react';

import Container from './Components/Container';

import history from './history';

import './App.css';

const qs = require('qs');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      isLoading: true,
      queryFilter: {
        page: 1,
        per_page: 6,
      },
      pagination: {
        page: 1,
        perPage: 6,
        beersLength: 0
      }
    };

    this.pageOptionsDefault = { page: 1, per_page: 6 };
  }

  listBeers( options = this.pageOptionsDefault ) {
    let currentBeers, nextBeers;
    const optionStr = qs.stringify(options);

    this.setState({ isLoading: true });

    fetch('https://api.punkapi.com/v2/beers' + (options ? ['?', optionStr].join('') : ''))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const beers = data;
        currentBeers = this.state.beers.slice();
        nextBeers = currentBeers.concat( beers );

        if( this.state.pagination.page === 1 ){
          this.setState({ beers: beers, pagination: { beersLength: beers.length } });
        } else {
          this.setState({ beers: nextBeers, pagination: { beersLength: beers.length } });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearch(beer_name, cb) {
    const nextQueryFilter = { ...this.state.queryFilter, beer_name, page: 1 };

    this.setState({ queryFilter: nextQueryFilter, pagination: { page: 1 } });
    this.listBeers( nextQueryFilter );
    cb();
  }

  handlePagination() {
    const { queryFilter } = this.state;
    const nextPage = ++queryFilter.page;
    const nextQueryFilter = { ...queryFilter, page: nextPage };

    this.setState({ queryFilter: nextQueryFilter, pagination: { page: nextPage } });
    this.listBeers( nextQueryFilter );
  }

  changeFilter(query) {
    const nextQueryFilter = (Object.keys(query).length !== 0) ? { ...this.state.queryFilter, query } : this.pageOptionsDefault;
    const resetPaginationQuery = { ...nextQueryFilter, page: 1 };

    this.setState({ queryFilter: resetPaginationQuery, pagination: { page: 1 } });
    this.listBeers( resetPaginationQuery );
  }

  componentDidMount() {
    this.listBeers();
  }

  render() {
    return (
      <Container
        {...this.state}
        changeFilter={(query) => ( this.changeFilter(query) )}
        handlePagination={(e) => ( this.handlePagination(e) )}
        handleSearch={(beer_name, cb) => ( this.handleSearch(beer_name, () => history.push('/')) )}
      />
    );
  }
}

export default App;

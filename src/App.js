import React, { Component } from 'react';

import Container from './Components/Container';

import './App.css';

const qs = require('qs');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
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
  }

  listBeers( options = { page: 1, per_page: 6 } ) {
    let currentBeers, nextBeers;
    const optionStr = qs.stringify(options);

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

  handleSearch(beer_name) {
    const nextQueryFilter = Object.assign(this.state.queryFilter, { beer_name, page: 1 });

    this.setState({ queryFilter: nextQueryFilter, pagination: { page: 1 } });
    this.listBeers( nextQueryFilter );
  }

  handlePagination() {
    const { queryFilter } = this.state;
    const nextPage = ++queryFilter.page;
    const nextQueryFilter = Object.assign(queryFilter, { page: nextPage });

    this.setState({ queryFilter: nextQueryFilter, pagination: { page: nextPage } });
    this.listBeers( nextQueryFilter );
  }

  changeFilter(query) {
    const nextQueryFilter = Object.assign(this.state.queryFilter, query);
    const resetPaginationQuery = Object.assign(nextQueryFilter, { page: 1 });

    this.setState({ queryFilter: resetPaginationQuery, pagination: { page: 1 } });
    this.listBeers( resetPaginationQuery );
  }

  resetFilter() {
    this.setState({ queryFilter: { page: 1, per_page: 6 }, pagination: { page: 1 } });
    this.listBeers( { page: 1, per_page: 6 } );
  }

  componentDidMount() {
    this.listBeers();
  }

  render() {
    return (
      <Container
        {...this.state}
        changeFilter={(query) => ( this.changeFilter(query) )}
        resetFilter={(e) => ( this.resetFilter(e) )}
        handlePagination={(e) => ( this.handlePagination(e) )}
        handleSearch={(e) => ( this.handleSearch(e) )}
      />
    );
  }
}

export default App;

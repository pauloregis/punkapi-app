import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Filter from './Filter';
import ActiveFilterList from './ActiveFilterList';
import BeerCard from './BeerCard';

import './BeersList.css';

const BeersList = ({
                     beers,
                     queryFilter,
                     changeFilter,
                     resetFilter,
                     handlePagination,
                     pagination
}) => (
  <Container>
    <Row>
      <Col sm="3">
        <Filter
          queryFilter={queryFilter}
          changeFilter={changeFilter}
          resetFilter={resetFilter}
        />
      </Col>
      <Col sm="9">
        <ActiveFilterList queryFilter={queryFilter} />

        <Row>
          <ul className="card_list">
            {
              beers.map((beer) => (
                <Col key={beer.id} sm="4">
                  <BeerCard beer={beer}/>
                </Col>
              ))
            }
          </ul>
        </Row>

        {pagination.beersLength === 6 &&
          <Row className="button_container">
            <button className="button button-loading_more" onClick={handlePagination}>Load more</button>
          </Row>
        }
      </Col>
    </Row>
  </Container>
);

export default BeersList;
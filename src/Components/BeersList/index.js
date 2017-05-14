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
                     handlePagination,
                     pagination
}) => (
  <Container>
    <Row>
      <Col sm="12" md="3">
        <Filter
          queryFilter={queryFilter}
          changeFilter={changeFilter}
        />
      </Col>
      <Col sm="12" md="9">
        <ActiveFilterList queryFilter={queryFilter} />

        <Row>
          <ul className="card_list">
            {
              beers.map((beer, index) => (
                <Col key={index} sm="12" md="6" lg="4">
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
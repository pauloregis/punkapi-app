import React from 'react';
import { Container, Navbar, NavbarBrand, Row, Col } from 'reactstrap';

import Search from './Search';

import logo from './../logo.svg';

const Header = (props) => (
  <div>
    <Navbar className="header">
      <Container>
        <NavbarBrand href="/">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>PunkBeer</h2>
        </NavbarBrand>
      </Container>
    </Navbar>
    <Row className="search_container">
      <Col sm="12">
        <Search {...props}/>
      </Col>
    </Row>
  </div>
);

export default Header;
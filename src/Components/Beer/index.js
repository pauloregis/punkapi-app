import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

import './Beer.css';

import { Container, Row, Col } from 'reactstrap';

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: {},
      isLoading: true
    };
  }

  getBeer(id) {
    this.setState({ isLoading: true });

    fetch(`https://api.punkapi.com/v2/beers/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          beer: data[0],
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillMount() {
    const { beers, match } = this.props;

    let beer = beers.filter((beer) => beer.id === Number(match.params.id));

    if(beer.length > 0) {
      beer = beer[0];
      return this.setState({ beer: beer, isLoading: false });
    }

    this.setState({ isLoading: false });
  }

  componentDidMount() {
    const { match } = this.props;

    if(Object.keys(this.state.beer).length === 0) {
      this.getBeer(match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getBeer(nextProps.match.params.id);
  }

  render() {
    const { beer } = this.state;

    return (
      <div className="single">
        {this.state.isLoading &&
          <Container className="single__is_loading">
            <Row>
              <p>Carregando...</p>
            </Row>
          </Container>
        }

        {( Object.keys(beer).length > 0 && !this.state.isLoading ) &&
        <Container className="single__content">
          <Row>
            <Col sm="12">
              <h1 className="single__title">{beer.name} <span><Link to='/beers'><i className="ion-arrow-left-c"></i> Back</Link></span></h1>
              <div className="single__subheader">
                <p>{beer.tagline}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <div className="single__image">
                <img src={beer.image_url} alt=""/>
              </div>
              <div className="single__description">
                <h3>Description</h3>
                <p>{beer.description}</p>
              </div>
              <div className="single__description">
                <h3>Brewers Tip</h3>
                <p>{beer.brewers_tips}</p>
              </div>
              <div className="single__description">
                <h3>Food Pairing</h3>
                <ul className="single__list">
                  {
                    beer.food_pairing.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  }
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
        }
      </div>
    )
  }
}

export default Beer;
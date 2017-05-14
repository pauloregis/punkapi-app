import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
  }

  handleClick() {
    const beer_name = Search.parseTextInput(this.state.value);

    if(beer_name.length === 0)
      return false;

    this.props.handleSearch(beer_name);
    this.resetInputValue();
  }

  handleSearch(event) {
    const keyCode = event.which || event.keyCode;
    const ENTER = 13;
    const beer_name = Search.parseTextInput(event.target.value);

    if(beer_name.length === 0)
      return false;

    if( keyCode === ENTER ) {
      this.props.handleSearch(beer_name);
      this.resetInputValue();
    }
  }

  resetInputValue() {
    this.setState({ value: '' });
  }

  static parseTextInput(text) {
    return text.replace(/\s/g, '_');
  }

  render() {
    return (
      <div className="search">
        <input
          type="search"
          placeholder="Procure pelo nome de alguma cerveja"
          {...this.state}
          onChange={(e) => ( this.handleChange(e) )}
          onKeyUp={(e) => ( this.handleSearch(e) )}
        />
        <button onClick={(e) => ( this.handleClick(e) )}>
          <i className="ion-android-search"/>
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

export default Search;
import React, { Component} from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class SliderWithTooltip extends Component {
  constructor(props) {
    super(props);
    const { min, max } = this.props;
    this.state = {
      value: [min, max]
    };
  }

  resetSlider() {
    const { min, max } = this.props;
    this.setState({ value: [min, max] });
  }

  handleAfterChange = (data, type) => {
    const { queryFilter, propsQuery, changeFilter, min, max } = this.props;
    const queryValue = ( type === 'brewed' ) ? [ '01-' + data[0], '01-' + data[1] ] : [ data[0], data[1] ];
    let query = Object.assign(queryFilter, { [propsQuery[0]]: queryValue[0], [propsQuery[1]]: queryValue[1] });

    if( data[0] === min )
      delete query[propsQuery[0]];

    if( data[1] === max )
      delete query[propsQuery[1]];

    changeFilter(query);
  };

  handleChange(value) {
    this.setState({ value: value });
  }

  componentWillMount() {
    const { filterType, queryFilter, propsQuery, min, max } = this.props;
    let value1 = min;
    let value2 = max;

    if( !!queryFilter[propsQuery[0]] ) {
      value1 = filterType === 'brewed'
        ? +queryFilter[propsQuery[0]].split('-')[1]
        : queryFilter[propsQuery[0]];
    }

    if( !!queryFilter[propsQuery[1]] ) {
      value2 = filterType === 'brewed'
        ? +queryFilter[propsQuery[1]].split('-')[1]
        : queryFilter[propsQuery[1]];
    }

    this.setState({ value: [ value1, value2 ] });
  }

  render() {
    const { title, filterType, min, max, defaultValue } = this.props;
    const { value } = this.state;

    return (
      <div>
        <strong className="filter__title">{title}</strong>
        <div className="filter__range__values">
          <span className="filter__range__values__min">De {value[0]}</span>
          <span className="filter__range__values__max">Até {value[1]}</span>
        </div>
        <Range
          className="range"
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={value}
          onChange={(value) => ( this.handleChange(value) )}
          onAfterChange={(data) => { this.handleAfterChange(data, filterType) }}
        />
      </div>
    );
  }
}

export default SliderWithTooltip;
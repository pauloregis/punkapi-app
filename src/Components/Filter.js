import React from 'react';
import 'rc-slider/assets/index.css';

import SliderWithTooltip from './SliderWithTooltip';

import './Filter.css';

const Filter = ({ queryFilter, changeFilter, resetFilter }) => {

  const sliders = [];
  const resetSlidersAndQueryFilter = (event) => {
    sliders.forEach((slider) => {
      slider.resetSlider();
    });
    resetFilter(event);
  };

  return (
    <div className="filter_container">
      <div>
        <button
          className="button-outline"
          onClick={(e) => ( resetSlidersAndQueryFilter(e) )}>
          Reset Filter
        </button>
      </div>

      <div className="filter">
        <div className="filter__item">
          <SliderWithTooltip
            title="Taxa de Álcool (ABV)"
            filterType="abv"
            propsQuery={['abv_gt', 'abv_lt']}
            queryFilter={queryFilter}
            min={0}
            max={60}
            ref={instance => ( sliders.push(instance) )}
            defaultValue={[0, 60]}
            changeFilter={changeFilter}
          />
        </div>
        <div className="filter__item">
          <SliderWithTooltip
            title="Taxa de Amargura (IBU)"
            filterType="ibu"
            propsQuery={['ibu_gt', 'ibu_lt']}
            queryFilter={queryFilter}
            min={0}
            max={1160}
            ref={instance => ( sliders.push(instance) )}
            defaultValue={[0, 1160]}
            changeFilter={changeFilter}
          />
        </div>
        <div className="filter__item">
          <SliderWithTooltip
            title="Taxa de Coloração (EBC)"
            filterType="ebc"
            propsQuery={['ebc_gt', 'ebc_lt']}
            queryFilter={queryFilter}
            min={0}
            max={510}
            ref={instance => ( sliders.push(instance) )}
            defaultValue={[0, 510]}
            changeFilter={changeFilter}
          />
        </div>
        <div className="filter__item">
          <SliderWithTooltip
            title="Data de Fabricação"
            filterType="brewed"
            propsQuery={['brewed_after', 'brewed_before']}
            queryFilter={queryFilter}
            min={2007}
            max={2017}
            ref={instance => ( sliders.push(instance) )}
            defaultValue={[2007, 2017]}
            changeFilter={changeFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
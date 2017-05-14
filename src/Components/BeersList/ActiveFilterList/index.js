import React from 'react';
import { Row } from 'reactstrap';

import ActiveFilterItem from './ActiveFilterItem';

const ActiveFilterList = ({ queryFilter }) => {

  const {
    beer_name, abv_gt, abv_lt, ibu_gt, ibu_lt, ebc_gt, ebc_lt, brewed_after, brewed_before
  } = queryFilter;

  const isNameActive = () => ( !!beer_name );

  const isABVActive = () => ( abv_gt > 0 || abv_lt < 60 );

  const isIBUActive = () => ( ibu_gt > 0 || ibu_lt < 1160 );

  const isEBCActive = () => ( ebc_gt > 0 || ebc_lt < 510 );

  const isBrewedActive = () => {
    const afterBrewedYear = ( !!brewed_after) ? brewed_after.split('-')[1] : 2007;
    const beforeBrewedYear = ( !!brewed_before ) ? brewed_before.split('-')[1] : 2017;

    return afterBrewedYear > 2007 || beforeBrewedYear < 2017;
  };

  const hasActiveFilters = () => (
    isNameActive() || isABVActive() || isIBUActive() || isEBCActive() || isBrewedActive()
  );

  return (
    <div>
      {hasActiveFilters() &&
        <Row className="current_filter__container">
          <div className="current_filter__title">
            <span>Used Filter:</span>
          </div>

          <ul className="current_filter__list">
            {isNameActive() &&
              <ActiveFilterItem>Beer Name</ActiveFilterItem>
            }
            {isABVActive() &&
              <ActiveFilterItem>ABV</ActiveFilterItem>
            }
            {isIBUActive() &&
              <ActiveFilterItem>IBU</ActiveFilterItem>
            }
            {isEBCActive() &&
              <ActiveFilterItem>EBC</ActiveFilterItem>
            }
            {isBrewedActive() &&
              <ActiveFilterItem>Brewed</ActiveFilterItem>
            }
          </ul>
        </Row>
      }
    </div>
  );
};

export default ActiveFilterList;
import React from 'react';

const ActiveFilterItem = ({ children }) => (
  <li className="current_filter__item">
    <span>{children}</span>
  </li>
);

export default ActiveFilterItem;
import React from 'react';
import { captialiseFirstLetter } from './filtersUtils';

const BEST_FOR_OPTIONS = ['running', 'casual', 'work'];

const BestForFilters = (props) => {
  const { handleCheck } = props;
  return (
    <React.Fragment>
      {BEST_FOR_OPTIONS.map((bestForOption, index) => (
        <label onChange={handleCheck} key={index}>
          <input id={bestForOption} type='checkbox' />
          {captialiseFirstLetter(bestForOption)}
        </label>
      ))}
    </React.Fragment>
  );
};

export default BestForFilters;

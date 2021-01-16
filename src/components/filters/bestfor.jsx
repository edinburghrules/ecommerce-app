import React from 'react';
import { captialiseFirstLetter } from './filtersUtils';
import hovercheck from '../../assets/hovercheck.png';
import checked from '../../assets/checked.png';

const BEST_FOR_OPTIONS = ['running', 'casual', 'work'];

const BestForFilters = (props) => {
  const { selectedBestFor, handleCheck } = props;
  return (
    <React.Fragment>
      {BEST_FOR_OPTIONS.map((bestForOption, index) => (
        <label
          className={selectedBestFor.includes(bestForOption) ? 'active' : ''}
          onChange={handleCheck}
          key={index}
        >
          <input id={bestForOption} type='checkbox' />
          <span>
            <img className='hover-checked' src={hovercheck} />
            <img className='checked' src={checked} />
          </span>
          {captialiseFirstLetter(bestForOption)}
        </label>
      ))}
    </React.Fragment>
  );
};

export default BestForFilters;

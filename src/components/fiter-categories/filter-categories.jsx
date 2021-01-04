import React from 'react';
import './filter-categories.scss';
import { Link, withRouter } from 'react-router-dom';

const FilterCategories = (props) => {
  const { options } = props;
  return (
    <div className='filter-categories'>
      {options &&
        options.map((option, index) => {
          if (index === 0)
            return (
              <div key={index} className='filter-categories__path'>
                <h5>Home / </h5>
                <Link to={`${option.path}`}> {option.title}</Link>{' '}
                <span> /</span>
              </div>
            );
          else {
            return (
              <Link key={index} to={`${option.path}`}>
                {option.title}
              </Link>
            );
          }
        })}
    </div>
  );
};

export default withRouter(FilterCategories);

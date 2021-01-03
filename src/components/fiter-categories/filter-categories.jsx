import React from 'react';
import './filter-categories.scss';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategoryProducts } from '../../redux/actions/productActions';

const FilterCategories = (props) => {
  const { options, getCategoryProducts } = props;
  const getProducts = (collection, category) => {
    getCategoryProducts(collection, category);
  };
  return (
    <div className='filter-categories'>
      {options &&
        options.map((option, index) => {
          if (index === 0)
            return (
              <div key={index} className='filter-categories__path'>
                <h5>Home / </h5>
                <h5> {option.title} /</h5>
              </div>
            );
          else {
            return (
              <NavLink
                onClick={() => getProducts(option.collection, option.category)}
                key={index}
                to={`${option.path}`}
              >
                {option.title}
              </NavLink>
            );
          }
        })}
    </div>
  );
};

const mapActionsToProps = {
  getCategoryProducts,
};

export default connect(null, mapActionsToProps)(FilterCategories);

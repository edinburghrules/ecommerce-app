import React from 'react';
import './menu-item.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productActions';

const MenuItem = ({ category, src, link, history, getAllProducts }) => {
  const getProducts = (e) => {
    e.preventDefault();
    console.log(link)
    getAllProducts(link, history);
  };
  return (
    <div onClick={getProducts} className='menu-item'>
      <div className='menu-item__content'>
        <div className='menu-item__img-wrapper'>
          <img src={src} alt={`${link}`} />
        </div>
        <h1 className='menu-item__title'>{category}</h1>
      </div>
    </div>
  );
};

const mapActionsToProps = {
  getAllProducts,
};

export default withRouter(connect(null, mapActionsToProps)(MenuItem));

import React from 'react';
import './menu-item.scss';
import { withRouter, Link } from 'react-router-dom';

const MenuItem = ({ category, src, link, match }) => {
  return (
    <Link to={`/collection/${link}`} className='menu-item'>
      <div className='menu-item__content'>
        <div className='menu-item__img-wrapper'>
          <img src={src} alt={`${link}`} />
        </div>
        <h1 className='menu-item__title'>{category}</h1>
      </div>
    </Link>
  );
};

export default withRouter(MenuItem);

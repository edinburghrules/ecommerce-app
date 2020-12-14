import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.scss';

const MenuItem = ({ category, src, link, history }) => {
  return (
    <div onClick={() => history.push(`/category/${link}`)} className='menu-item'>
      <div className='menu-item__content'>
        <img src={src} alt={`${link}`} />
        <h1 className='menu-item__title'>{category}</h1>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);

import React from 'react';
import './menu-item.scss';

const MenuItem = ({ title, src }) => {
  return (
    <div className='menu-item'>
      <div className='menu-item__content'>
        <img src={src} />
        <h1 className='menu-item__title'>{title}</h1>
      </div>
    </div>
  );
};

export default MenuItem;

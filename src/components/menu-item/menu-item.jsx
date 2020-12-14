import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.scss';

const MenuItem = ({ title, src, link, history }) => {
  return (
    <div onClick={() => history.push(`/${link}`)} className='menu-item'>
      <div className='menu-item__content'>
        <img src={src} alt={`${link}`} />
        <h1 className='menu-item__title'>{title}</h1>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);

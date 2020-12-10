import React from 'react';
import './navigation-bar.scss';

const NavigationBar = () => {
  return (
    <React.Fragment>
      <nav className='nav'>
        <div className='nav__logo'>
          <img className='nav__logo-img' src='/assets/logo2.png' alt='oceanic'/>
          <h1>OCEANIC</h1>
        </div>
        <div className='nav__menu'>
          <ul className='nav__menu-list'>
            <li className='nav__menu-list-item'>HOME</li>
            <li className='nav-menu-list-item'>SHOP</li>
          </ul>
        </div>
        <div className='nav__user-menu'>
          <img
            className='nav__user-menu-item'
            src='/assets/001-user.png'
            alt='user login'
          />
          <img
            className='nav__user-menu-item'
            src='/assets/004-heart-shape-outline.png'
            alt='favourites'
          />
          <img
            className='nav__user-menu-item'
            src='/assets/003-loupe.png'
            alt='search'
          />
          <img
            className='nav__user-menu-item'
            src='/assets/002-shopping-bag.png'
            alt='shopping bag'
          />
        </div>
      </nav>
      <div className='announcement'>
        <div className='announcement__returns'>
          <h4>FREE RETURNS & EXCHANGES</h4>
          <p>Extended to 60 days for the holidays <span role='img'>🎅🏼</span></p>
        </div>
        <div className='announcement__deliveries'>
          <h4>FREE SHIPPING</h4>
          <p>On orders over £50 📦</p>
        </div>
        <div className='announcement__last-order'>
          <h4>LAST ORDER DATE FOR CHRISTMAS DELIVERY</h4>
          <p>21/12/2020 🗓</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavigationBar;

import React from 'react';
import './navigation-bar.scss';
import logo from '../../assets/logo2.png'
import user from '../../assets/001-user.png';
import favourites from '../../assets/004-heart-shape-outline.png';
import search from '../../assets/003-loupe.png';
import shopping from '../../assets/002-shopping-bag.png';
import mobile from '../../assets/menu.png';

const NavigationBar = () => {
  return (
    <React.Fragment>
      <nav className='nav'>
        <div className='nav__logo'>
          <img src={logo} />
          <div className='nav__logo-text'>
           <p>Faith</p>
           <p>Apparel</p>
          </div>
        </div>
        <div className='nav__menu'>
          <ul className='nav__menu-list'>
            <li className='nav__menu-list-item'>HOME</li>
            <li className='nav__menu-list-item'>MEN</li>
            <li className='nav__menu-list-item'>WOMEN</li>
            <li className='nav__menu-list-item'>KIDS</li>
          </ul>
        </div>
        <div className='nav__user-menu'>
          <img
            className='nav__user-menu-item'
            src={user}
            alt='user login'
          />
          <img
            className='nav__user-menu-item'
            src={favourites}
            alt='favourites'
          />
          <img
            className='nav__user-menu-item'
            src={search}
            alt='search'
          />
          <img
            className='nav__user-menu-item'
            src={shopping}
            alt='shopping bag'
          />
        </div>
        <div className='nav__mobile-menu'>
          <img src={mobile} />
        </div>
      </nav>
      <div className='announcement'>
        <div className='announcement__returns'>
          <h4>FREE RETURNS & EXCHANGES</h4>
          <p>
            Extended to 60 days for the holidays <span role='img'>🎅🏼</span>
          </p>
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

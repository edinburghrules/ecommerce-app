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
        <div className='nav__menu'>
          <ul className='nav__menu-list'>
            <li className='nav__menu-list-item'>Men</li>
            <li className='nav__menu-list-item'>Women</li>
            <li className='nav__menu-list-item'>Kids</li>
          </ul>
        </div>
        <div className='nav__logo'>
          <img src={logo} />
          <div className='nav__logo-text'>
           <p>Faith</p>
           <p>Apparel</p>
          </div>
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
            src={shopping}
            alt='shopping bag'
          />
        </div>
        <div className='nav__mobile-menu'>
          <img src={mobile} />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavigationBar;

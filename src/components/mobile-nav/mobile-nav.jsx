import React from 'react';
import './mobile-nav.scss';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import user from '../../assets/001-user.png';
import shopping from '../../assets/002-shopping-bag.png';
import closebutton from '../../assets/close-button.png';
import rightArrow from '../../assets/002-right-1.png';
import leftArrow from '../../assets/001-arrow.png';

const MobileNav = ({
  mobileMenuWidth,
  linksToRender,
  mensMobileOpen,
  handleClose,
  goBack,
  handleMensMenu,
  handleWomensMenu,
  handleProductDropdown,
  showProductDropdown,
  x,
  history,
}) => {
  return (
    <div style={{ width: `${mobileMenuWidth}vw` }} className='mobile-menu'>
      <div className='mobile-menu__content-container'>
        <div className='mobile-menu__top-buttons'>
          <img src={closebutton} onClick={handleClose} alt='close button' />
          <div
            onClick={() => history.push('/')}
            className='mobile-menu__nav-logo'
          >
            <img src={logo} alt='logo' />
          </div>
          <div className='mobile-menu__user-btns'>
            <img src={user} alt='user login' />
            <img src={shopping} alt='shopping bag' />
          </div>
        </div>
        <div className='mobile-menu__content'>
          <div className='mobile-menu__links-container'>
            <div
              className='mobile-menu__links'
              style={{ transform: `translateX(-${x}%)` }}
            >
              <div onClick={handleMensMenu}>
                <p className='mobile-menu__link'>Mens</p>
                <img src={rightArrow} alt='left arrow' />
              </div>
              <div onClick={handleWomensMenu}>
                <p className='mobile-menu__link'>Womens</p>
                <img src={rightArrow} alt='left arrow' />
              </div>
              <div>
                <p className='mobile-menu__link'>Collections</p>
                <img src={rightArrow} alt='left arrow' />
              </div>
            </div>
            {/* DYNAMIC MENU CONTENT */}
            <ul
              className='mobile-menu__links'
              style={{ transform: `translateX(-${x}%)` }}
            >
              <div onClick={goBack} style={{ justifyContent: 'flex-start' }}>
                <img
                  style={{ marginRight: '2rem' }}
                  src={leftArrow}
                  alt='left arrow'
                />
                <li className='mobile-menu__link'>
                  {mensMobileOpen ? 'Men' : 'Women'}
                </li>
              </div>
              {linksToRender &&
                linksToRender.apparelLinks.map((link, i) => {
                  if (i === 0) {
                    return (
                      <div
                        onClick={handleProductDropdown}
                        className='mobile-menu__dropdown-header'
                      >
                        <li className='mobile-menu__link'>{link.category}</li>
                        <img
                          style={{
                            transform: showProductDropdown
                              ? 'rotate(90deg)'
                              : 'rotate(0deg)',
                            transition: 'transform 0.1s ease-in',
                          }}
                          src={rightArrow}
                          alt='right arrow'
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={
                          showProductDropdown
                            ? 'mobile-menu__dropdown-link'
                            : 'mobile-menu__dropdown-link hide'
                        }
                      >
                        <li className='mobile-menu__link'>{link.category}</li>
                      </div>
                    );
                  }
                })}
            </ul>
            {/* DYNAMIC MENU CONTENT */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MobileNav);

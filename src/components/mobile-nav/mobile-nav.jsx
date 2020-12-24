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
  womensMobileOpen,
  handleOpen,
  handleClose,
  goBack,
  handleMensMenu,
  handleWomensMenu,
  handleProductDropdown,
  apparelDropdown,
  shoesDropdown,
  collectionsDropdown,
  x,
  history,
}) => {
  return (
    <div style={{ width: `${mobileMenuWidth}vw` }} className='mobile-menu'>
      <div className='mobile-menu__content-container'>
        <div className='mobile-menu__top-buttons'>
          <img id='close-mobile' src={closebutton} onClick={handleClose} alt='close button' />
          <div
            onClick={() => history.push('/')}
            className='mobile-menu__nav-logo'
          >
            <img src={logo} alt='logo' />
          </div>
          <div className='mobile-menu__user-btns'>
            <img src={user} alt='user login' />
            <img
              id='cart'
              onClick={handleOpen}
              src={shopping}
              alt='shopping bag'
            />
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
            <div
              className='mobile-menu__links'
              style={{ transform: `translateX(-${x}%)` }}
            >
              <div onClick={goBack} style={{ justifyContent: 'flex-start' }}>
                <img
                  style={{ marginRight: '2rem' }}
                  src={leftArrow}
                  alt='left arrow'
                />
                <p className='mobile-menu__link'>
                  {mensMobileOpen && 'Mens'}
                  {womensMobileOpen && 'Womens'}
                </p>
              </div>
              {linksToRender &&
                linksToRender.apparelLinks.map((link, i) => {
                  if (i === 0) {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          handleProductDropdown(link);
                        }}
                        className='mobile-menu__dropdown-header'
                      >
                        <p className='mobile-menu__link'>{link.category}</p>
                        <img
                          style={{
                            transform: apparelDropdown
                              ? 'rotate(90deg)'
                              : 'rotate(0deg)',
                          }}
                          src={rightArrow}
                          alt='right arrow'
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={i}
                        className={
                          apparelDropdown
                            ? 'mobile-menu__dropdown-link'
                            : 'mobile-menu__dropdown-link hide'
                        }
                      >
                        <p className='mobile-menu__link hide'>
                          {link.category}
                        </p>
                      </div>
                    );
                  }
                })}
              {linksToRender &&
                linksToRender.shoeLinks.map((link, i) => {
                  if (i === 0) {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          handleProductDropdown(link);
                        }}
                        className='mobile-menu__dropdown-header'
                      >
                        <p className='mobile-menu__link'>{link.category}</p>
                        <img
                          style={{
                            transform: shoesDropdown
                              ? 'rotate(90deg)'
                              : 'rotate(0deg)',
                          }}
                          src={rightArrow}
                          alt='right arrow'
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={i}
                        className={
                          shoesDropdown
                            ? 'mobile-menu__dropdown-link'
                            : 'mobile-menu__dropdown-link hide'
                        }
                      >
                        <p className='mobile-menu__link'>{link.category}</p>
                      </div>
                    );
                  }
                })}
              {linksToRender &&
                linksToRender.collectionLinks.map((link, i) => {
                  if (i === 0) {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          handleProductDropdown(link);
                        }}
                        className='mobile-menu__dropdown-header'
                      >
                        <p className='mobile-menu__link'>{link.category}</p>
                        <img
                          style={{
                            transform: collectionsDropdown
                              ? 'rotate(90deg)'
                              : 'rotate(0deg)',
                          }}
                          src={rightArrow}
                          alt='right arrow'
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={i}
                        className={
                          collectionsDropdown
                            ? 'mobile-menu__dropdown-link'
                            : 'mobile-menu__dropdown-link hide'
                        }
                      >
                        <p className='mobile-menu__link'>{link.category}</p>
                      </div>
                    );
                  }
                })}
            </div>
            {/* DYNAMIC MENU CONTENT */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MobileNav);

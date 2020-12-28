import React from 'react';
import './nav-dropdown.scss';
import { withRouter, Link } from 'react-router-dom';

const NavDropdown = ({
  handleClose,
  mensDesktopOpen,
  womensDesktopOpen,
  linksToRender,
  history,
}) => {
  return (
    <div id='close-dropdown' className='dropdown' onClick={handleClose}>
      <div
        className={
          mensDesktopOpen || womensDesktopOpen
            ? `dropdown__menu open`
            : `dropdown__menu`
        }
      >
        <div
          className={
            mensDesktopOpen
              ? 'dropdown__menu-content open'
              : womensDesktopOpen
              ? 'dropdown__menu-content open'
              : 'dropdown__menu-content'
          }
        >
          <div className='dropdown__column'>
            {linksToRender &&
              linksToRender.apparelLinks.map(({ path, category }, i) => (
                <Link to={path} key={i}>
                  {category}
                </Link>
              ))}
          </div>
          <div className='dropdown__column'>
            {linksToRender &&
              linksToRender.shoeLinks.map(({ path, category }, i) => (
                <Link to={path} key={i}>
                  {category}
                </Link>
              ))}
          </div>
          <div className='categories'>
            {linksToRender &&
              linksToRender.collectionLinks.map(
                ({ path, category, img }, i) => (
                  <div onClick={() => history.push(path)} key={i}>
                    {img && <img src={img} alt='collection' />}
                    <p>{category}</p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NavDropdown);

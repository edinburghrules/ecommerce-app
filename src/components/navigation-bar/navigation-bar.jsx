import React from 'react';
import './navigation-bar.scss';
import { withRouter, Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import user from '../../assets/001-user.png';
import favourites from '../../assets/004-heart-shape-outline.png';
import shopping from '../../assets/002-shopping-bag.png';
import mobile from '../../assets/menu.png';

class NavigationBar extends React.Component {
  state = {
    mensOpen: false,
    womensOpen: false,
  };
  handleOpen = (e) => {
    this.setState((prevState) => ({
      [`${e.target.id}Open`]: !prevState[`${e.target.id}Open`],
    }));
  };
  render() {
    const { mensOpen } = this.state;
    const {
      history,
      mensApparelLinks,
      mensShoeLinks,
      mensCollectionLinks,
    } = this.props;
    return (
      <React.Fragment>
        <nav className='nav'>
          <div className='nav__menu'>
            <ul className='nav__menu-list'>
              <li
                id='mens'
                onClick={this.handleOpen}
                className={
                  mensOpen
                    ? `nav__menu-list-item active`
                    : `nav__menu-list-item`
                }
              >
                Men
              </li>
              <li
                id='womens'
                onClick={this.handleOpen}
                className='nav__menu-list-item'
              >
                Women
              </li>
              <li className='nav__menu-list-item'>Collections</li>
            </ul>
          </div>
          <div onClick={() => history.push('/')} className='nav__logo'>
            <img src={logo} alt='logo' />
            <div className='nav__logo-text'>
              <p>Faith</p>
              <p>Apparel</p>
            </div>
          </div>
          <div className='nav__user-menu'>
            <img
              onClick={() => history.push('/signin')}
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
            <img src={mobile} alt='mobile menu' />
          </div>
        </nav>
        <div className='dropdown'>
          <div className={mensOpen ? `dropdown__menu open` : `dropdown__menu`}>
            <div
              className={
                mensOpen
                  ? 'dropdown__menu-content open'
                  : 'dropdown__menu-content'
              }
            >
              <div className='dropdown__column'>
                {mensApparelLinks.map(({ path, category }) => (
                  <Link to={path}>{category}</Link>
                ))}
              </div>
              <div className='dropdown__column'>
                {mensShoeLinks.map(({ path, category }) => (
                  <Link to={path}>{category}</Link>
                ))}
              </div>
              <div className='dropdown__column'>
                {mensCollectionLinks.map(({ path, category }) => (
                  <Link to={path}>{category}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={mensOpen ? 'overlay open' : ''}></div>
      </React.Fragment>
    );
  }
}

export default withRouter(NavigationBar);

import React from 'react';
import './navigation-bar.scss';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import user from '../../assets/001-user.png';
import favourites from '../../assets/004-heart-shape-outline.png';
import shopping from '../../assets/002-shopping-bag.png';
import closebutton from '../../assets/close-button.png';
import mobile from '../../assets/menu.png';

class NavigationBar extends React.Component {
  state = {
    mensOpen: false,
    womensOpen: false,
    width: 0,
  };
  handleOpen = (e) => {
    if (e.target.id === 'womens') {
      this.setState({
        womensOpen: true,
        mensOpen: false,
      });
    }

    if (e.target.id === 'mens') {
      this.setState({
        mensOpen: true,
        womensOpen: false,
      });
    }

    if (e.target.id === 'mobile') {
      this.setState({
        width: 100,
      });
    }
  };
  handleClose = () => {
    this.setState({
      mensOpen: false,
      womensOpen: false,
      width: 0,
    });
  };
  renderLinks = () => {
    if (this.state.mensOpen) {
      return {
        apparelLinks: this.props.mensApparelLinks,
        shoeLinks: this.props.mensShoeLinks,
        collectionLinks: this.props.mensCollectionLinks,
      };
    } else if (this.state.womensOpen) {
      return {
        apparelLinks: this.props.womensApparelLinks,
        shoeLinks: this.props.womensShoeLinks,
        collectionLinks: this.props.womensCollectionLinks,
      };
    }
  };
  render() {
    const { mensOpen, womensOpen, width } = this.state;
    const linksToRender = this.renderLinks();
    const { history } = this.props;
    return (
      <React.Fragment>
        <div style={{ width: `${width}vw` }} className='mobile-menu'>
          <div className='mobile-menu__content-container'>
            <div className='mobile-menu__top-buttons'>
              <img src={closebutton} onClick={this.handleClose} />
              <div onClick={() => history.push('/')} className='nav__logo'>
                <img src={logo} alt='logo' />
                <div className='nav__logo-text'>
                  <p>Faith</p>
                  <p>Apparel</p>
                </div>
              </div>
              <img src={shopping} alt='shopping bag' />
            </div>
            <div className='mobile-menu__content'></div>
          </div>
        </div>
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
                className={
                  womensOpen
                    ? `nav__menu-list-item active`
                    : `nav__menu-list-item`
                }
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
            <div className='nav__user-menu-item'>
              <img
                onClick={() => history.push('/signin')}
                src={user}
                alt='user login'
              />
              <div className='account__menu'>
                <button onClick={() => alert(1)}>SIGN IN</button>
                <p onClick={() => alert(3)}>Not registered? Sign up!</p>
              </div>
            </div>
            <div className='nav__user-menu-item'>
              <img src={favourites} alt='favourites' />
            </div>
            <div className='nav__user-menu-item'>
              <img src={shopping} alt='shopping bag' />
            </div>
          </div>
          <div className='nav__mobile-menu'>
            <img
              id='mobile'
              onClick={this.handleOpen}
              src={mobile}
              alt='mobile menu'
            />
          </div>
        </nav>
        <div className='dropdown' onClick={this.handleClose}>
          <div
            className={
              mensOpen || womensOpen ? `dropdown__menu open` : `dropdown__menu`
            }
          >
            <div
              className={
                mensOpen
                  ? 'dropdown__menu-content open'
                  : womensOpen
                  ? 'dropdown__menu-content open'
                  : 'dropdown__menu-content'
              }
            >
              <div className='dropdown__column'>
                {linksToRender &&
                  linksToRender.apparelLinks.map(({ path, category }) => (
                    <p onClick={() => history.push(path)} key={path}>
                      {category}
                    </p>
                  ))}
              </div>
              <div className='dropdown__column'>
                {linksToRender &&
                  linksToRender.shoeLinks.map(({ path, category }) => (
                    <p onClick={() => history.push(path)} key={path}>
                      {category}
                    </p>
                  ))}
              </div>
              <div className='categories'>
                {linksToRender &&
                  linksToRender.collectionLinks.map(
                    ({ path, category, img }) => (
                      <div onClick={() => history.push(path)} key={path}>
                        {img && <img src={img} />}
                        <p>{category}</p>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className={mensOpen || womensOpen ? 'overlay open' : ''}></div>
      </React.Fragment>
    );
  }
}

export default withRouter(NavigationBar);

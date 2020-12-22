import React from 'react';
import './navigation-bar.scss';
import { withRouter } from 'react-router-dom';
import NavDropdown from '../nav-dropdown/nav-dropdown';
import MobileNav from '../mobile-nav/mobile-nav';
import logo from '../../assets/logo2.png';
import user from '../../assets/001-user.png';
import favourites from '../../assets/004-heart-shape-outline.png';
import shopping from '../../assets/002-shopping-bag.png';
import mobile from '../../assets/menu.png';

class NavigationBar extends React.Component {
  state = {
    mensDesktopOpen: false,
    womensDesktopOpen: false,
    mensMobileOpen: false,
    womensMobileOpen: false,
    apparelDropdown: false,
    shoesDropdown: false,
    collectionsDropddown: false,
    mobileMenuWidth: 0,
    x: 0,
  };

  handleOpen = (e) => {
    if (e.target.id === 'womens') {
      this.setState({
        womensDesktopOpen: true,
        mensDesktopOpen: false,
      });
    }

    if (e.target.id === 'mens') {
      this.setState({
        mensDesktopOpen: true,
        womensDesktopOpen: false,
      });
    }

    if (e.target.id === 'mobile') {
      this.setState({
        mobileMenuWidth: 100,
      });
    }
  };

  handleClose = () => {
    this.setState({
      mensDesktopOpen: false,
      womensDesktopOpen: false,
      mensMobileOpen: false,
      womensMobileOpen: false,
      apparelDropdown: false,
      shoesDropdown: false,
      collectionsDropdown: false,
      mobileMenuWidth: 0,
      x: 0,
    });
  };

  renderLinks = () => {
    if (this.state.mensDesktopOpen || this.state.mensMobileOpen) {
      return {
        apparelLinks: this.props.mensApparelLinks,
        shoeLinks: this.props.mensShoeLinks,
        collectionLinks: this.props.mensCollectionLinks,
      };
    } else if (this.state.womensDesktopOpen || this.state.womensMobileOpen) {
      return {
        apparelLinks: this.props.womensApparelLinks,
        shoeLinks: this.props.womensShoeLinks,
        collectionLinks: this.props.womensCollectionLinks,
      };
    }
  };

  handleMensMenu = () => {
    this.setState((prevState) => ({
      x: prevState.x + 100,
      mensMobileOpen: true,
      womensMobileOpen: false,
    }));
  };

  handleWomensMenu = () => {
    this.setState((prevState) => ({
      x: prevState.x + 100,
      mensMobileOpen: false,
      womensMobileOpen: true,
    }));
  };

  goBack = (e) => {
    this.setState((prevState) => ({
      x: prevState.x - 100,
      mensMobileOpen: false,
      womensMobileOpen: false,
    }));
  };

  handleProductDropdown = (link) => {
    console.log(link.category);
    let productType;
    if (link.category.includes('Apparel')) {
      productType = 'apparelDropdown';
    } else if (link.category.includes('Shoes')) {
      productType = 'shoesDropdown';
    } else if (link.category.includes('Collection')) {
      productType = 'collectionsDropdown';
    }
    this.setState((prevState) => ({
      [productType]: !prevState[productType],
    }));
  };

  render() {
    const {
      mensDesktopOpen,
      womensDesktopOpen,
      mensMobileOpen,
      womensMobileOpen,
      apparelDropdown,
      shoesDropdown,
      collectionsDropdown,
      mobileMenuWidth,
      x,
    } = this.state;
    const linksToRender = this.renderLinks();
    const { history } = this.props;
    return (
      <React.Fragment>
        <MobileNav
          mobileMenuWidth={mobileMenuWidth}
          linksToRender={linksToRender}
          mensMobileOpen={mensMobileOpen}
          womensMobileOpen={womensMobileOpen}
          handleClose={this.handleClose}
          goBack={this.goBack}
          handleMensMenu={this.handleMensMenu}
          handleWomensMenu={this.handleWomensMenu}
          handleProductDropdown={this.handleProductDropdown}
          apparelDropdown={apparelDropdown}
          shoesDropdown={shoesDropdown}
          collectionsDropdown={collectionsDropdown}
          x={x}
        />
        <nav className='nav'>
          <div className='nav__menu'>
            <ul className='nav__menu-list'>
              <li
                id='mens'
                onClick={this.handleOpen}
                className={
                  mensDesktopOpen
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
                  womensDesktopOpen
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
        <NavDropdown
          mensDesktopOpen={mensDesktopOpen}
          womensDesktopOpen={womensDesktopOpen}
          handleClose={this.handleClose}
          linksToRender={linksToRender}
        />
        <div
          className={mensDesktopOpen || womensDesktopOpen ? 'overlay open' : ''}
        ></div>
      </React.Fragment>
    );
  }
}

export default withRouter(NavigationBar);

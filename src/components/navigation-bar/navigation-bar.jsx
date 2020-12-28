import React from 'react';
import './navigation-bar.scss';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/accountActions';
import NavDropdown from '../nav-dropdown/nav-dropdown';
import Cart from '../cart/cart';
import MobileNav from '../mobile-nav/mobile-nav';
import logo from '../../assets/logo2.png';
import user from '../../assets/001-user.png';
import favourites from '../../assets/004-heart-shape-outline.png';
import shopping from '../../assets/002-shopping-bag.png';
import mobile from '../../assets/menu.png';

class NavigationBar extends React.Component {
  state = {
    windowWidth: '',
    mensDesktopOpen: false,
    womensDesktopOpen: false,
    mensMobileOpen: false,
    womensMobileOpen: false,
    apparelDropdown: false,
    shoesDropdown: false,
    collectionsDropddown: false,
    mobileMenuWidth: 0,
    cartMenuWidth: 0,
    cartOpen: false,
    x: 0,
  };

  componentDidMount = () => {
    this.updateWindowSize();
    window.addEventListener('resize', this.updateWindowSize);
  };

  updateWindowSize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
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

    if (e.target.id === 'cart') {
      this.setState((prevState) => ({
        cartMenuWidth:
          prevState.windowWidth > 950
            ? 40
            : prevState.windowWidth > 768
            ? 50
            : 100,
        cartOpen: true,
      }));
    }
  };

  handleClose = (e) => {
    if (e.currentTarget.id === 'close-cart') {
      this.setState({
        cartMenuWidth: 0,
        cartOpen: false,
      });
    }

    if (e.currentTarget.id === 'close-mobile') {
      this.setState({
        mobileMenuWidth: 0,
        x: 0,
        mensMobileOpen: false,
        womensMobileOpen: false,
        apparelDropdown: false,
        shoesDropdown: false,
        collectionsDropdown: false,
      });
    }

    if (e.currentTarget.id === 'close-dropdown') {
      this.setState({
        mensDesktopOpen: false,
        womensDesktopOpen: false,
      });
    }
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
      cartMenuWidth,
      cartOpen,
      mobileMenuWidth,
      x,
    } = this.state;
    const linksToRender = this.renderLinks();
    const { authenticated, accountName, signOut, history } = this.props;
    return (
      <React.Fragment>
        <MobileNav
          mobileMenuWidth={mobileMenuWidth}
          linksToRender={linksToRender}
          mensMobileOpen={mensMobileOpen}
          womensMobileOpen={womensMobileOpen}
          handleOpen={this.handleOpen}
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
        <nav className='navigation'>
          <Cart handleClose={this.handleClose} cartMenuWidth={cartMenuWidth} />
          <div className='navigation__menu'>
            <ul className='navigation__menu-list'>
              <li
                id='mens'
                onClick={this.handleOpen}
                className={
                  mensDesktopOpen
                    ? `navigation__menu-list-item active`
                    : `navigation__menu-list-item`
                }
              >
                Men
              </li>
              <li
                id='womens'
                onClick={this.handleOpen}
                className={
                  womensDesktopOpen
                    ? `navigation__menu-list-item active`
                    : `navigation__menu-list-item`
                }
              >
                Women
              </li>
              <li className='navigation__menu-list-item'>Collections</li>
            </ul>
          </div>
          <div onClick={() => history.push('/')} className='navigation__logo'>
            <img src={logo} alt='logo' />
            <div className='navigation__logo-text'>
              <p>Faith</p>
              <p>Apparel</p>
          </div>
          </div>
          <div className='navigation__user-menu'>
            <div className='navigation__user-menu-item'>
              <img src={user} alt='user login' />
              <div className='account__menu'>
                {authenticated ? (
                  <React.Fragment>
                    <p className='account__menu-welcome'>
                      Welcome {accountName}!
                    </p>
                    <Link to='/account'>My Account</Link>
                    <button onClick={signOut}>SIGN OUT</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={() => history.push('/signin')}>
                      SIGN IN
                    </button>
                    <p
                      className='account__menu-register'
                      onClick={() => history.push('/register')}
                    >
                      Not registered? Sign up!
                    </p>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className='navigation__user-menu-item'>
              <img src={favourites} alt='favourites' />
            </div>
            <div className='navigation__user-menu-item'>
              <img
                onClick={this.handleOpen}
                id='cart'
                src={shopping}
                alt='shopping bag'
              />
            </div>
          </div>
          <div className='navigation__mobile-menu'>
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
          className={
            mensDesktopOpen || womensDesktopOpen || cartOpen
              ? 'overlay open'
              : ''
          }
        ></div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.account.authenticated,
    accountName: state.account.credentials.firstName,
  };
};

const mapActionsToProps = {
  signOut,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(NavigationBar)
);

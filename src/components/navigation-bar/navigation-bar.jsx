import React from "react";
import "./navigation-bar.scss";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/accountActions";
import { openCart, closeCart } from "../../redux/actions/cartActions";
import NavDropdown from "../nav-dropdown/nav-dropdown";
import Cart from "../cart/cart-list/cart";
import MobileNav from "../mobile-nav/mobile-nav";
import user from "../../assets/001-user.png";
import favourites from "../../assets/heart-outline.png";
import shopping from "../../assets/shopping-bag.png";
import mobile from "../../assets/menu.png";

class NavigationBar extends React.Component {
  state = {
    windowWidth: "",
    mensDropdownOpen: false,
    womensDropdownOpen: false,
    mensMobileOpen: false,
    womensMobileOpen: false,
    apparelDropdown: false,
    shoesDropdown: false,
    collectionsDropddown: false,
    cartOpen: false,
    cartTotalQty: 0,
    mobileOpen: false,
    x: 0,
  };

  componentDidMount = () => {
    if (this.props.cartList.length > 0) {
      let cartTotalQty = this.props.cartList.reduce((total, currentItem) => {
        return (total += currentItem.qty);
      }, 0);
      this.setState({
        cartTotalQty,
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.cartOpen && this.props.cartOpen) {
      this.setState({
        cartOpen: true,
      });
    }

    if (prevProps.cartList !== this.props.cartList) {
      if (this.props.cartList.length > 0) {
        let cartTotalQty = this.props.cartList.reduce((total, currentItem) => {
          return (total += currentItem.qty);
        }, 0);
        this.setState({
          cartTotalQty,
        });
      } else {
        this.setState({
          cartTotalQty: 0,
        });
      }
    }
  };

  handleCartOpen = () => {
    this.setState(
      (prevState) => ({
        ...prevState,
        cartOpen: !prevState.cartOpen,
        mensDropdownOpen: false,
        womensDropdownOpen: false,
      }),
      () => {
        if (this.state.cartOpen) {
          this.props.openCart();
        } else {
          this.props.closeCart();
        }
      }
    );
  };

  handleMobileOpen = () => {
    this.setState((prevState) => ({
      ...prevState,
      mobileOpen: !prevState.mobileOpen,
    }));
  };

  handleMensDropdownOpen = () => {
    this.setState((prevState) => ({
      mensDropdownOpen: !prevState.mensDropdownOpen,
      womensDropdownOpen: false,
      cartOpen: false,
    }));
  };

  handleWomensDropdownOpen = () => {
    this.setState((prevState) => ({
      mensDropdownOpen: false,
      womensDropdownOpen: !prevState.womensDropdownOpen,
      cartOpen: false,
    }));
  };

  renderLinks = () => {
    if (this.state.mensDropdownOpen || this.state.mensMobileOpen) {
      return {
        apparelLinks: this.props.mensApparelLinks,
        shoeLinks: this.props.mensShoeLinks,
        collectionLinks: this.props.mensCollectionLinks,
      };
    } else if (this.state.womensDropdownOpen || this.state.womensMobileOpen) {
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
    if (link.title.includes("Apparel")) {
      productType = "apparelDropdown";
    } else if (link.title.includes("Shoes")) {
      productType = "shoesDropdown";
    } else if (link.title.includes("Collection")) {
      productType = "collectionsDropdown";
    }
    this.setState((prevState) => ({
      [productType]: !prevState[productType],
    }));
  };

  render() {
    const {
      mensDropdownOpen,
      womensDropdownOpen,
      mensMobileOpen,
      womensMobileOpen,
      apparelDropdown,
      shoesDropdown,
      collectionsDropdown,
      cartOpen,
      cartTotalQty,
      mobileOpen,
      x,
    } = this.state;
    const linksToRender = this.renderLinks();
    const { authenticated, account, signOut, history } = this.props;

    return (
      <React.Fragment>
        <MobileNav
          linksToRender={linksToRender}
          mensMobileOpen={mensMobileOpen}
          womensMobileOpen={womensMobileOpen}
          handleCartOpen={this.handleCartOpen}
          handleMobileOpen={this.handleMobileOpen}
          goBack={this.goBack}
          handleMensMenu={this.handleMensMenu}
          handleWomensMenu={this.handleWomensMenu}
          handleProductDropdown={this.handleProductDropdown}
          apparelDropdown={apparelDropdown}
          shoesDropdown={shoesDropdown}
          collectionsDropdown={collectionsDropdown}
          mobileOpen={mobileOpen}
          x={x}
        />
        <nav className="navigation">
          <Cart cartOpen={cartOpen} handleCartOpen={this.handleCartOpen} />
          <div className="navigation__menu">
            <ul className="navigation__menu-list">
              <li
                id="mens"
                onClick={this.handleMensDropdownOpen}
                className={
                  mensDropdownOpen
                    ? `navigation__menu-list-item active`
                    : `navigation__menu-list-item`
                }
              >
                Men
              </li>
              <li
                id="womens"
                onClick={this.handleWomensDropdownOpen}
                className={
                  womensDropdownOpen
                    ? `navigation__menu-list-item active`
                    : `navigation__menu-list-item`
                }
              >
                Women
              </li>
            </ul>
          </div>
          <div onClick={() => history.push("/")} className="navigation__logo">
            <div className="navigation__logo">
              <h1
                style={{
                  fontFamily: `helvetica`,
                  fontWeight: "900",
                  fontSize: "2.4rem",
                }}
              >
                apparel.
              </h1>
            </div>
          </div>
          <div className="navigation__user-menu">
            <div className="navigation__user-menu-item">
              <img src={user} alt="user login" />
              <div className="account__menu">
                {authenticated ? (
                  <React.Fragment>
                    <p className="account__menu-welcome">
                      Welcome {account.firstName}!
                    </p>
                    <Link to={`/account/${account.email}`}>My Account</Link>
                    <button onClick={() => signOut(history)}>SIGN OUT</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={() => history.push("/signin")}>
                      SIGN IN
                    </button>
                    <Link className="account__menu-register" to="/register">
                      No account? Register here!
                    </Link>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="navigation__user-menu-item">
              <Link
                to={
                  authenticated ? `/favourites/${account.email}` : `/favourites`
                }
              >
                <img src={favourites} alt="favourites" />
              </Link>
            </div>
            <div className="navigation__user-menu-item navigation__user-menu-item--cart">
              {cartTotalQty > 0 && (
                <div className="navigation__cart-total">{cartTotalQty}</div>
              )}
              <img
                onClick={this.handleCartOpen}
                id="cart"
                src={shopping}
                alt="shopping bag"
              />
            </div>
          </div>
          <div className="navigation__mobile-menu">
            <img
              id="mobile"
              onClick={this.handleMobileOpen}
              src={mobile}
              alt="mobile menu"
            />
          </div>
        </nav>
        <NavDropdown
          mensDropdownOpen={mensDropdownOpen}
          womensDropdownOpen={womensDropdownOpen}
          handleMensDropdownOpen={this.handleMensDropdownOpen}
          handleWomensDropdownOpen={this.handleWomensDropdownOpen}
          linksToRender={linksToRender}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.account.authenticated,
    account: state.account.credentials,
    cartOpen: state.cart.cartOpen,
    cartList: state.cart.cartList,
  };
};

const mapActionsToProps = {
  signOut,
  closeCart,
  openCart,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(NavigationBar)
);

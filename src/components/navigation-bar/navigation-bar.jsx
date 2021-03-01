import React from "react";
import "./navigation-bar.scss";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/accountActions";
import { closeCart } from "../../redux/actions/cartActions";
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
    mensDesktopOpen: false,
    womensDesktopOpen: false,
    mensMobileOpen: false,
    womensMobileOpen: false,
    apparelDropdown: false,
    shoesDropdown: false,
    collectionsDropddown: false,
    mobileMenuWidth: 0,
    cartOpen: false,
    cartTotalQty: 0,
    x: 0,
  };

  componentDidMount = () => {
    this.updateWindowSize();
    window.addEventListener("resize", this.updateWindowSize);
    if (this.props.cartList.length > 0) {
      let cartTotalQty = this.props.cartList.reduce((total, currentItem) => {
        return (total += currentItem.qty);
      }, 0);
      this.setState({
        cartTotalQty,
      });
    }
  };

  updateWindowSize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
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

  handleOpen = (e) => {
    if (e.target.id === "womens") {
      this.setState({
        womensDesktopOpen: true,
        mensDesktopOpen: false,
      });
    }

    if (e.target.id === "mens") {
      this.setState({
        mensDesktopOpen: true,
        womensDesktopOpen: false,
      });
    }

    if (e.target.id === "mobile") {
      this.setState({
        mobileMenuWidth: 100,
      });
    }

    if (e.target.id === "cart") {
      this.setState((prevState) => ({
        cartOpen: true,
      }));
    }
  };

  handleClose = (e) => {
    if (e.currentTarget.id === "close-cart") {
      this.props.closeCart();

      this.setState({
        cartClosing: true,
      });

      setTimeout(() => {
        this.setState({
          cartClosing: false,
          cartOpen: false,
        });
      }, 200);
    }

    if (e.currentTarget.id === "close-mobile") {
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

    if (e.currentTarget.id === "close-dropdown") {
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
    if (link.category.includes("Apparel")) {
      productType = "apparelDropdown";
    } else if (link.category.includes("Shoes")) {
      productType = "shoesDropdown";
    } else if (link.category.includes("Collection")) {
      productType = "collectionsDropdown";
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
      cartOpen,
      cartTotalQty,
      mobileMenuWidth,
      x,
    } = this.state;
    const linksToRender = this.renderLinks();
    const { authenticated, account, signOut, history } = this.props;

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
        <nav className="navigation">
          <Cart cartOpen={cartOpen} handleClose={this.handleClose} />

          <div className="navigation__menu">
            <ul className="navigation__menu-list">
              <li
                id="mens"
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
                id="womens"
                onClick={this.handleOpen}
                className={
                  womensDesktopOpen
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
                    <Link to="/account">My Account</Link>
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
                onClick={this.handleOpen}
                id="cart"
                src={shopping}
                alt="shopping bag"
              />
            </div>
          </div>
          <div className="navigation__mobile-menu">
            <img
              id="mobile"
              onClick={this.handleOpen}
              src={mobile}
              alt="mobile menu"
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
          className={mensDesktopOpen || womensDesktopOpen ? "overlay open" : ""}
        ></div>
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
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(NavigationBar)
);

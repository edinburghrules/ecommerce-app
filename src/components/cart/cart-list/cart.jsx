import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./cart.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCart, closeCart } from "../../../redux/actions/cartActions";
import CartItem from "../cart-item/cart-item";
import closeArrow from "../../../assets/close-arrow.png";
import shopping from "../../../assets/shopping-bag.png";
import { CSSTransition } from "react-transition-group";

class Cart extends Component {
  state = {
    cart: [],
    totalPrice: 0,
    shipping: 5.0,
    freeDelivery: 45,
    toFreeDelivery: 0,
    toFreeDeliveryProgress: 0,
    isOpen: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const totalQty = this.props.cart.reduce(function (total, currentValue) {
      total += currentValue.qty;
      return total;
    }, 0);

    const totalPrice = this.props.cart.reduce(function (total, currentValue) {
      if (currentValue.qty > 1) {
        total += currentValue.price * currentValue.qty;
      } else {
        total += currentValue.price;
      }
      return total;
    }, 0);

    if (prevState.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
        totalQty,
        totalPrice,
        toFreeDeliveryProgress: (totalPrice / this.state.freeDelivery) * 100,
        toFreeDelivery:
          this.state.freeDelivery - totalPrice > 0
            ? this.state.freeDelivery - totalPrice
            : 0,
      });
    }
  };

  handleClick = () => {
    this.props.history.push({
      pathname: "/checkout",
      state: { fromCart: true },
    });
    this.props.closeCart();
  };

  render() {
    const { cart, totalQty, totalPrice, shipping, toFreeDelivery } = this.state;
    const { handleCartOpen } = this.props;

    return ReactDOM.createPortal(
      <React.Fragment>
        <CSSTransition
          unmountOnExit
          mountOnEnter
          in={this.props.cartOpen}
          classNames="fade"
          timeout={400}
        >
          <div className="overlay" />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          mountOnEnter
          in={this.props.cartOpen}
          classNames="slide"
          timeout={{
            enter: 200,
            exit: 1000,
          }}
        >
          <div className="cart">
            <div className="cart__top">
              <img
                id="close-cart"
                onClick={handleCartOpen}
                className="cart__close-btn"
                src={closeArrow}
                alt="close"
              />
              <div className="cart__delivery-container">
                <div className="cart__total-container">
                  <div className="cart__total">
                    <div
                      className={
                        totalQty <= 9
                          ? "cart__total cart__total--sm"
                          : "cart__total cart__total--lg"
                      }
                    >
                      <p>{totalQty && totalQty}</p>
                    </div>
                  </div>
                  <img className="cart__icon" src={shopping} alt="cart" />
                </div>
                <p className="cart__free-delivery">
                  {toFreeDelivery > 0 &&
                    `You're £${toFreeDelivery} away from free delivery !`}
                  {toFreeDelivery === 0 &&
                    `Congratulations you get free delivery 🎉`}
                </p>
                <div className="cart__progress-bar">
                  <div
                    style={{
                      width: `${this.state.toFreeDeliveryProgress}%`,
                    }}
                    className="cart__progress-bar-progress"
                  ></div>
                </div>
              </div>
            </div>
            <div className="cart__content">
              {cart && cart.length > 0
                ? cart.map((cartItem, i) => {
                    return <CartItem cartItem={cartItem} key={i} />;
                  })
                : cart &&
                  cart.length === 0 && (
                    <React.Fragment>
                      <h1>Your Cart is Empty</h1>
                      <div className="cart__empty">
                        <iframe
                          title="empt cart gif"
                          src="https://giphy.com/embed/1Zbeweu52ZaQE"
                          width="600"
                          height="auto"
                          frameBorder="0"
                          className="giphy-embed"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </React.Fragment>
                  )}
            </div>
            <div className="cart__bottom">
              <div className="cart__total-price">
                <span>Subtotal:</span>
                <span>£{totalPrice}</span>
              </div>
              <div className="cart__shipping-cost">
                <span>Shipping:</span>
                <span>{toFreeDelivery === 0 ? "Free" : `£${shipping}`} </span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={this.handleClick}
                className="cart__checkout-btn"
              >
                Checkout
              </button>
            </div>
          </div>
        </CSSTransition>
      </React.Fragment>,
      document.getElementById("root")
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartList,
  authenticated: state.account.authenticated,
  cartLoading: state.async.loadingCart,
});

const mapActionsToProps = {
  getCart,
  closeCart,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Cart));

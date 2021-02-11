import React, { Component } from "react";
import "./cart.scss";
import { connect } from "react-redux";
import { getCart } from "../../../redux/actions/cartActions";
import Loading from "../../loading/loading";
import CartItem from "../cart-item/cart-item";
import closeArrow from "../../../assets/close-arrow.png";
import shopping from "../../../assets/002-shopping-bag.png";

class Cart extends Component {
  state = {
    cart: [],
    totalPrice: 0,
    shipping: 0,
  };

  // Get cart items
  componentDidMount = async () => {
    if (this.props.authenticated) {
      await this.props.getCart();
      this.setState({
        cart: this.props.cart,
      });
    } else {
      this.setState({
        cart: [{ name: "FAKE NEWS!" }],
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
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
      });
    }
  };

  render() {
    const { cart, totalQty, totalPrice, shipping } = this.state;
    const { handleClose, cartLoading } = this.props;
    return (
      <div className="cart">
        <div className="cart__top">
          <img
            id="close-cart"
            onClick={handleClose}
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
              You're £50 away from free delivery
            </p>
            <div className="cart__progress-bar"></div>
          </div>
        </div>
        <div className="cart__content">
          {cartLoading && <Loading />}
          {cart &&
            cart.length > 0 &&
            cart.map((cartItem) => {
              return <CartItem cartItem={cartItem} />;
            })}
          {cart && cart.length === 0 && (
            <React.Fragment>
              <h1>Your Cart is Empty</h1>
              <div className="cart__product-categories">
                <button className="cart__product-btn">Shop Mens</button>
                <button className="cart__product-btn">Shop Women</button>
                <button className="cart__product-btn">Shop Collections</button>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="cart__bottom">
          <div className="cart__total-price">
            <span>SUBTOTAL:</span>
            <span>£{totalPrice}</span>
          </div>
          <div className="cart__shipping-cost">
            <span>SHIPPING:</span>
            <span>£{shipping} </span>
          </div>
          <button className="cart__checkout-btn">Checkout</button>
        </div>
      </div>
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
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);

import React, { Component } from "react";
import "./cart.scss";
import { connect } from "react-redux";
import { getCart } from "../../../redux/actions/cartActions";
import CartItem from "../cart-item/cart-item";
import closeArrow from "../../../assets/close-arrow.png";
import shopping from "../../../assets/shopping-bag.png";

class Cart extends Component {
  state = {
    cart: [],
    totalPrice: 0,
    shipping: 45,
    freeDelivery: 45,
    toFreeDelivery: 0,
    toFreeDeliveryProgress: 0,
  };

  // Get cart items
  componentDidMount = async () => {
    await this.props.getCart(this.props.authenticated);
    this.setState({
      cart: this.props.cart,
    });
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
        toFreeDeliveryProgress: (totalPrice / this.state.freeDelivery) * 100,
        toFreeDelivery:
          this.state.freeDelivery - totalPrice > 0
            ? this.state.freeDelivery - totalPrice
            : 0,
      });
    }
  };

  render() {
    const { cart, totalQty, totalPrice, shipping, toFreeDelivery } = this.state;
    const { handleClose } = this.props;
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
                  <div className="cart__product-categories">
                    <button className="cart__product-btn">Shop Mens</button>
                    <button className="cart__product-btn">Shop Women</button>
                    <button className="cart__product-btn">
                      Shop Collections
                    </button>
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
            <span>£{toFreeDelivery === 0 ? "FREE" : shipping} </span>
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

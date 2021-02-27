import React from "react";
import "./cart-item.scss";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  deleteFromCart,
  increaseQty,
  decreaseQty,
} from "../../../redux/actions/cartActions";
import { capitaliseFirstLetter } from "../../../utils/text-formatting/text-formatting";
import closeButton from "../../../assets/close-button.png";

class CartItem extends React.Component {
  handleDelete = () => {
    const product = {
      id: this.props.cartItem.id,
      color: this.props.cartItem.color,
      size: this.props.cartItem.size,
      collection: this.props.cartItem.collection,
    };
    this.props.deleteFromCart(product, this.props.authenticated);
  };

  handleQtyChange = async (e) => {
    const product = {
      id: this.props.cartItem.id,
      color: this.props.cartItem.color,
      size: this.props.cartItem.size,
      collection: this.props.cartItem.collection,
    };
    if (e.currentTarget.id === "increase") {
      this.props.increaseQty(product, this.props.authenticated);
    } else if (e.currentTarget.id === "decrease") {
      this.props.decreaseQty(product, this.props.authenticated);
    }
  };

  render() {
    const {
      cartItem: { name, color, size, image, price, qty },
      lowStockMsg,
      loading,
    } = this.props;

    if (loading) {
      return (
        <div className="cart-item">
          <div className="cart-item__content">
            <div className="cart-item__loading">
              <Spinner animation="border" variant="primary" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="cart-item">
          <div className="cart-item__img-container">
            <img
              className="cart-item__img"
              src={image}
              alt={`${name} in ${color}`}
            />
          </div>
          <div className="cart-item__content">
            <div className="cart-item__content-header">
              <h4 className="cart-item__name">{name}</h4>
              <button onClick={this.handleDelete}>
                <img
                  className="cart-item__close-button"
                  src={closeButton}
                  alt="close cart"
                />
              </button>
            </div>
            <p className="cart-item__color">
              {color && capitaliseFirstLetter(color)}
            </p>
            <p className="cart-item__size">{`Size: UK ${size}`}</p>
            <div className="cart-item__qty-container">
              <div className="cart-item__qty">
                <button
                  disabled={lowStockMsg && lowStockMsg}
                  className={
                    lowStockMsg && lowStockMsg
                      ? "cart-item__qty-btn cart-item__qty-btn--disabled"
                      : "cart-item__qty-btn"
                  }
                  id="increase"
                  onClick={this.handleQtyChange}
                >
                  +
                </button>
                <span>{qty}</span>
                <button
                  className="cart-item__qty-btn"
                  id="decrease"
                  onClick={this.handleQtyChange}
                >
                  -
                </button>
              </div>
              <p className="cart-item__price">£{price}</p>
            </div>
            <span className="cart-item__low-stock-msg">
              {lowStockMsg && lowStockMsg.msg}
            </span>
          </div>
        </div>
      );
    }
  }
}

// Get the cartItem in cart
const lowStockSelector = (state, ownProps) => {
  if (state.cart.lowStockMsg.length > 0) {
    return state.cart.lowStockMsg.find((item) => {
      return (
        item.cartItem.id === ownProps.cartItem.id &&
        item.cartItem.color === ownProps.cartItem.color &&
        item.cartItem.size === ownProps.cartItem.size
      );
    });
  }
};

const loadingSelector = (state, ownProps) => {
  if (state.async.loadingCart.loading) {
    if (
      state.async.loadingCart.cartItem.id === ownProps.cartItem.id &&
      state.async.loadingCart.cartItem.color === ownProps.cartItem.color &&
      state.async.loadingCart.cartItem.size === ownProps.cartItem.size
    ) {
      return state.async.loadingCart.loading;
    }
  }
};

const mapStateToProps = (state, ownProps) => ({
  lowStockMsg: lowStockSelector(state, ownProps),
  authenticated: state.account.authenticated,
  loading: loadingSelector(state, ownProps),
});

const mapActionsToProps = {
  deleteFromCart,
  increaseQty,
  decreaseQty,
};

export default connect(mapStateToProps, mapActionsToProps)(CartItem);

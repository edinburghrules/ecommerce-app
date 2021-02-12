import React from "react";
import "./cart-item.scss";
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
    };
    this.props.deleteFromCart(product, this.props.authenticated);
  };

  handleQtyChange = async (e) => {
    const product = {
      id: this.props.cartItem.id,
      color: this.props.cartItem.color,
      size: this.props.cartItem.size,
      category: this.props.cartItem.category,
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
    } = this.props;
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
              <button id="increase" onClick={this.handleQtyChange}>
                +
              </button>
              <span>{qty}</span>
              <button id="decrease" onClick={this.handleQtyChange}>
                -
              </button>
            </div>
            <p className="cart-item__price">£{price}</p>
          </div>
          <span className="cart-item__low-stock-msg">
            {lowStockMsg && lowStockMsg}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lowStockMsg: state.cart.lowStockMsg,
  authenticated: state.account.authenticated,
});

const mapActionsToProps = {
  deleteFromCart,
  increaseQty,
  decreaseQty,
};

export default connect(mapStateToProps, mapActionsToProps)(CartItem);

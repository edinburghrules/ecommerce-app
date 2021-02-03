import React, { Component } from "react";
import "./cart.scss";
import { connect } from "react-redux";
import closeArrow from "../../assets/close-arrow.png";
import shopping from "../../assets/002-shopping-bag.png";

class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount = () => {
    if (this.props.authenticated) {
      this.setState({
        cart: this.props.cart,
      });
    } else {
      this.setState({
        cart: [{ name: "FAKE NEWS!" }],
      });
    }
  };

  render() {
    const { handleClose } = this.props;
    return (
      <React.Fragment>
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
                <p>1</p>
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
          {this.state.cart &&
            this.state.cart.length > 0 &&
            this.state.cart.map((item) => {
              return <h1>{item.name}</h1>;
            })}
          <React.Fragment>
            <h1>Your Cart is Empty</h1>
            <div className="cart__product-categories">
              <button className="cart__product-btn">Shop Mens</button>
              <button className="cart__product-btn">Shop Women</button>
              <button className="cart__product-btn">Shop Collections</button>
            </div>
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartList,
  authenticated: state.account.authenticated,
});

export default connect(mapStateToProps)(Cart);

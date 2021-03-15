import React from "react";
import "./checkout-page.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import ExpressCheckout from "../../components/express-checkout/express-checkout";
import CheckoutForm from "../../components/checkout-form/checkout-form";
import CheckoutLineItem from "../../components/checkout-line-item/checkout-line-item";

const CheckoutPage = (props) => {
  const { cartList, authenticated, credentials } = props;

  const totalPrice = cartList.reduce(function (total, currentValue) {
    if (currentValue.qty > 1) {
      total += currentValue.price * currentValue.qty;
    } else {
      total += currentValue.price;
    }
    return total;
  }, 0);

  return (
    <div className="checkout-page">
      <div className="checkout-page__left-col">
        <Link className="checkout-page__logo" to="/">
          apparel.
        </Link>
        <h1>CHECKOUT</h1>
        <ExpressCheckout />
        <div className="checkout-page__divider">
          <hr />
          <span>OR CONTINUE BELOW TO PAY BY CARD</span>
        </div>
        <div className="checkout-page__email-form"></div>
        <div className="checkout-page__delivery-address-form">
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <CheckoutForm
                authenticated={authenticated}
                stripe={stripe}
                elements={elements}
                totalPrice={totalPrice}
                credentials={credentials}
                lineItems={cartList}
              />
            )}
          </ElementsConsumer>
        </div>
      </div>
      <div className="checkout-page__right-col">
        <div className="checkout-page__line-items">
          {cartList &&
            cartList.map((cartItem, index) => (
              <CheckoutLineItem key={index} lineItem={cartItem} />
            ))}
        </div>
        <div className="checkout-page__total-charges">
          <h1>£{totalPrice}</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  credentials: state.account.credentials,
  cartList: state.cart.cartList,
});

export default connect(mapStateToProps)(CheckoutPage);

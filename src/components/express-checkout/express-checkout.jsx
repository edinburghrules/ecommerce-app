import React from "react";
import "./express-checkout.scss";
import payPalIcon from "../../assets/paypal.svg";

const ExpressCheckout = () => {
  return (
    <div className="express-checkout">
      <h2>Express checkout</h2>
      <div className="express-checkout__btns">
        <button>
          <img src={payPalIcon} alt="paypal" />
        </button>
      </div>
    </div>
  );
};

export default ExpressCheckout;

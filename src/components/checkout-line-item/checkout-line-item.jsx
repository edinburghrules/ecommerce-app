import React from "react";
import "./checkout-line-item.scss";
import { capitaliseFirstLetter } from "../../utils/text-formatting/text-formatting";

const CheckoutLineItem = (props) => {
  const { lineItem } = props;

  return (
    <div className="checkout-line-item">
      <div className="checkout-line-item__image-container">
        <img src={lineItem.image} alt="product" />
        <span className="checkout-line-item__qty">{lineItem.qty}</span>
      </div>
      <div className="checkout-line-item__info-container">
        <h4>{lineItem.name}</h4>
        <p>{capitaliseFirstLetter(lineItem.color)}</p>
        <p>UK {lineItem.size}</p>
        <p>£{lineItem.price}</p>
      </div>
    </div>
  );
};

export default CheckoutLineItem;

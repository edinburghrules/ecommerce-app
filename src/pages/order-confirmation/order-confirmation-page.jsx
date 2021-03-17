import React from "react";
import "./order-confirmation-page.scss";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOrder } from "../../redux/actions/orderActions";
import { capitaliseFirstLetter } from "../../utils/text-formatting/text-formatting";
import visa from "../../assets/visa.svg";

class OrderConfirmationPage extends React.Component {
  componentDidMount = () => {
    let order = localStorage.getItem(this.props.match.params.orderId);
    if (order) {
      console.log(order);
      this.props.history.push({
        pathname: "/",
        state: { fromOrderConfirmation: true },
      });
    } else {
      console.log(order);
      // call action to do get order request
      this.props.getOrder(this.props.match.params.orderId);
      localStorage.setItem(
        this.props.match.params.orderId,
        JSON.stringify(this.props.match.params.orderId)
      );
    }
  };

  render() {
    const { match, location, order } = this.props;

    if (!location.state) {
      return <Redirect to="/" />;
    }

    if (!order) {
      return <h1>Loading....</h1>;
    }

    return (
      <div className="order-confirmation-page">
        <div className="order-confirmation-page__content">
          <div className="order-confirmation-page__heading">
            <Link
              to={{
                pathname: "/",
                state: { fromOrderConfirmation: true },
              }}
            >
              apparel
            </Link>
            <h1>Your Order Confirmed!</h1>
            <h2>Hello {"Sean"},</h2>
            <p>
              Your order has been confirmed and will be shipping within two
              days.
            </p>
          </div>
          <div className="order-confirmation-page__order-details">
            <div className="order-confirmation-page__order-details-section">
              <span className="order-confirmation-page__order-details-section-header">
                Order Date
              </span>{" "}
              <span>{order.created}</span>
            </div>
            <div className="order-confirmation-page__order-details-section">
              <span className="order-confirmation-page__order-details-section-header">
                Order No.
              </span>{" "}
              <span>{match.params.orderId}</span>
            </div>
            <div className="order-confirmation-page__order-details-section order-confirmation-page__order-details-section--card">
              <span className="order-confirmation-page__order-details-section-header">
                Payment
              </span>
              <div>
                <span>****{order.cardUsed.last4}</span>{" "}
                <span>
                  <img src={visa} alt="visa cart" />
                </span>
              </div>
            </div>
            <div className="order-confirmation-page__order-details-section">
              <span className="order-confirmation-page__order-details-section-header">
                Shipping Address
              </span>
              <div>
                <span>
                  {order.shippingAddress.line1}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postal_code}
                </span>
              </div>
            </div>
          </div>
          <div className="order-confirmation-page__line-items">
            {order.lineItems.map((lineItem, i) => (
              <div key={i} className="order-confirmation-page__line-item">
                <div className="order-confirmation-page__line-item-image">
                  <img src={lineItem.image} alt="line item" />
                </div>
                <div className="order-confirmation-page__line-item-details">
                  <p>{lineItem.name}</p>
                  <p>Size : UK {lineItem.size}</p>
                  <p>Color : {capitaliseFirstLetter(lineItem.color)}</p>
                  <p>Quantity : {lineItem.qty}</p>
                </div>
                <div className="order-confirmation-page__line-item-price">
                  <p>£ {lineItem.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-confirmation-page__cost-details">
            <div className="order-confirmation-page__costs">
              <div className="order-confirmation-page__subtotal">
                <p>Subtotal</p> <p>£ 100</p>
              </div>
              <div className="order-confirmation-page__shipping">
                <p>Shipping</p> <p>FREE</p>
              </div>
              <div className="order-confirmation-page__total">
                <p>Total</p> <p>£ {order.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="order-confirmation-page__confirmation-message">
            <p>Thank you for shopping with us!</p>
            <p>Apparel Team</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.orders.order,
});

const mapActionsToProps = {
  getOrder,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(OrderConfirmationPage);
